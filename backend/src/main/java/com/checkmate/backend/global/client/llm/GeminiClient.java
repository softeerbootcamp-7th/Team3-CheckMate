package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.domain.chat.dto.Message;
import com.checkmate.backend.global.client.BaseClient;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Component
public class GeminiClient extends BaseClient implements LlmClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model-name}")
    private String modelName;

    @Value("${gemini.lite-model-name}")
    private String liteModelName;

    public GeminiClient(RestClient.Builder restClientBuilder, ObjectMapper objectMapper) {
        super(restClientBuilder, objectMapper, "https://generativelanguage.googleapis.com");
    }

    @Override
    public String ask(String systemInstruction, String userMessage) {
        String uri = String.format("/v1beta/models/%s:generateContent", modelName);

        Map<String, String> headers =
                Map.of("x-goog-api-key", apiKey, "Content-Type", "application/json");

        // 공식 문서의 JSON 구조 매핑
        Map<String, Object> requestBody =
                Map.of(
                        "system_instruction",
                        Map.of("parts", List.of(Map.of("text", systemInstruction))),
                        "contents",
                        List.of(Map.of("parts", List.of(Map.of("text", userMessage)))),
                        "generationConfig",
                        Map.of(
                                "responseMimeType",
                                "application/json",
                                "temperature",
                                1.0,
                                "thinkingConfig",
                                Map.of("thinkingLevel", "low")));

        JsonNode response = post(uri, headers, requestBody, JsonNode.class);

        return extractText(response);
    }

    @Override
    public String askWithHistory(
            String systemInstruction, List<Message> history, String currentQuestion) {
        String uri = String.format("/v1beta/models/%s:generateContent", modelName);

        List<Map<String, Object>> contents = new ArrayList<>();
        for (Message msg : history) {
            contents.add(
                    Map.of(
                            "role",
                            msg.role().equals("assistant") ? "model" : "user",
                            "parts",
                            List.of(Map.of("text", msg.content()))));
        }

        contents.add(Map.of("role", "user", "parts", List.of(Map.of("text", currentQuestion))));

        Map<String, Object> requestBody =
                Map.of(
                        "system_instruction",
                                Map.of("parts", List.of(Map.of("text", systemInstruction))),
                        "contents", contents,
                        "generationConfig", Map.of("temperature", 0.7));

        JsonNode response =
                post(uri, Map.of("x-goog-api-key", apiKey), requestBody, JsonNode.class);
        return extractText(response);
    }

    @Override
    public String generateIngredients(String systemInstruction, String menuName) {
        String uri = String.format("/v1beta/models/%s:generateContent", liteModelName);

        Map<String, String> headers =
                Map.of("x-goog-api-key", apiKey, "Content-Type", "application/json");

        Map<String, Object> requestBody =
                Map.of(
                        "system_instruction",
                        Map.of("parts", List.of(Map.of("text", systemInstruction))),
                        "contents",
                        List.of(Map.of("parts", List.of(Map.of("text", "메뉴명: " + menuName)))),
                        "generationConfig",
                        Map.of("responseMimeType", "application/json", "temperature", 0.1));

        JsonNode response = post(uri, headers, requestBody, JsonNode.class);

        return extractText(response);
    }

    private String extractText(JsonNode response) {
        try {
            return response.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            log.error("Gemini 응답 추출 실패. 전체 응답: {}", response);
            throw new InternalServerException(ErrorStatus.AI_RESPONSE_PARSE_FAILED);
        }
    }

    @Override
    public void askWithHistoryStream(
            String systemInstruction,
            List<Message> history,
            String currentQuestion,
            SseEmitter emitter) {

        String uri =
                String.format("/v1beta/models/%s:streamGenerateContent?alt=sse", liteModelName);
        Map<String, Object> requestBody =
                createRequestBody(systemInstruction, history, currentQuestion);

        restClient
                .post()
                .uri(uri)
                .header("x-goog-api-key", apiKey)
                .body(requestBody)
                .exchange(
                        (request, response) -> {
                            // 1. 초기 응답 에러 확인 (4xx, 5xx)
                            if (response.getStatusCode().isError()) {
                                log.error("Gemini API 초기 호출 에러: {}", response.getStatusCode());
                                sendErrorEvent(emitter, ErrorStatus.EXTERNAL_API_ERROR);
                                return null;
                            }

                            // 2. 스트리밍 데이터 읽기
                            try (BufferedReader reader =
                                    new BufferedReader(
                                            new InputStreamReader(
                                                    response.getBody(), StandardCharsets.UTF_8))) {

                                String line;
                                while ((line = reader.readLine()) != null) {
                                    if (line.startsWith("data: ")) {
                                        String jsonData = line.substring(6);
                                        JsonNode node = objectMapper.readTree(jsonData);

                                        // 안전 필터링 체크
                                        if (isBlocked(node)) {
                                            emitter.send(
                                                    SseEmitter.event()
                                                            .data("[부적절한 요청으로 인해 답변이 차단되었습니다.]"));
                                            break;
                                        }

                                        // 텍스트 추출 및 전송 (extractText 내부 에러도 스트림 에러로 처리)
                                        try {
                                            String text = extractText(node);
                                            if (text != null && !text.isEmpty()) {
                                                emitter.send(SseEmitter.event().data(text));
                                            }
                                        } catch (Exception e) {
                                            log.warn("청크 데이터 파싱 실패: {}", e.getMessage());
                                            sendErrorEvent(
                                                    emitter, ErrorStatus.AI_RESPONSE_PARSE_FAILED);
                                            return null;
                                        }
                                    }
                                }
                                emitter.complete(); // 정상 종료

                            } catch (IOException e) {
                                // 스트리밍 도중 연결이 끊긴 경우
                                log.error("스트리밍 연결 유실: ", e);
                                sendErrorEvent(emitter, ErrorStatus.STREAMING_CONNECTION_FAILED);
                            } catch (Exception e) {
                                // 그 외 알 수 없는 에러
                                log.error("스트리밍 중 알 수 없는 에러 발생: ", e);
                                emitter.completeWithError(e);
                            }
                            return null;
                        });
    }

    // 안전 필터링 체크 로직 추가
    private boolean isBlocked(JsonNode node) {
        JsonNode candidatesNode = node.path("candidates");
        if (candidatesNode.isMissingNode()
                || !candidatesNode.isArray()
                || candidatesNode.isEmpty()) {
            return false;
        }

        JsonNode candidate = candidatesNode.get(0);
        String finishReason = candidate.path("finishReason").asText();
        return "SAFETY".equals(finishReason) || "RECITATION".equals(finishReason);
    }

    private Map<String, Object> createRequestBody(
            String systemInstruction, List<Message> history, String currentQuestion) {

        List<Map<String, Object>> contents = new ArrayList<>();

        // 1. 대화 히스토리 추가
        for (Message msg : history) {
            contents.add(
                    Map.of(
                            "role",
                            msg.role().equals("assistant") ? "model" : "user",
                            "parts",
                            List.of(Map.of("text", msg.content()))));
        }

        // 2. 현재 질문 추가
        contents.add(Map.of("role", "user", "parts", List.of(Map.of("text", currentQuestion))));

        // 3. 전체 구조 생성
        return Map.of(
                "system_instruction", Map.of("parts", List.of(Map.of("text", systemInstruction))),
                "contents", contents,
                "generationConfig",
                        Map.of(
                                "temperature",
                                0.7,
                                "topK",
                                40,
                                "topP",
                                0.95,
                                "maxOutputTokens",
                                1024));
    }

    private void sendErrorEvent(SseEmitter emitter, ErrorStatus status) {
        try {
            emitter.send(SseEmitter.event().name("error").data(status.getMessage()));
            emitter.complete();
        } catch (Exception e) {
            log.error("SSE 에러 전송 실패", e);
        }
    }
}
