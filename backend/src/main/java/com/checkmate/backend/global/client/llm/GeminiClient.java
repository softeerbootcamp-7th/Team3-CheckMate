package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.domain.chat.dto.Message;
import com.checkmate.backend.global.client.BaseClient;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
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
            String systemInstruction, List<Message> history, String currentQuestion, SseEmitter emitter) {

        String uri = String.format("/v1beta/models/%s:streamGenerateContent?alt=sse", liteModelName);
        Map<String, Object> requestBody = createRequestBody(systemInstruction, history, currentQuestion);

        restClient.post()
                .uri(uri)
                .header("x-goog-api-key", apiKey)
                .body(requestBody)
                .exchange((request, response) -> {
                    // 1. HTTP 상태 코드 확인 (200 OK가 아닌 경우)
                    if (response.getStatusCode().isError()) {
                        String errorLog = String.format("Gemini API Error: %s", response.getStatusCode());
                        log.error(errorLog);
                        emitter.send(SseEmitter.event().name("error").data("API 호출에 실패했습니다."));
                        emitter.complete();
                        return null;
                    }

                    try (BufferedReader reader = new BufferedReader(
                            new InputStreamReader(response.getBody(), StandardCharsets.UTF_8))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            if (line.startsWith("data: ")) {
                                String jsonData = line.substring(6);
                                JsonNode node = objectMapper.readTree(jsonData);

                                // 2. 응답 데이터 검증 (Safety Filter 등에 의해 차단되었는지 확인)
                                if (isBlocked(node)) {
                                    emitter.send(SseEmitter.event().data("[부적절한 요청으로 인해 답변이 차단되었습니다.]"));
                                    break;
                                }

                                String text = extractText(node);
                                if (text != null && !text.isEmpty()) {
                                    emitter.send(SseEmitter.event().data(text));
                                }
                            }
                        }
                        emitter.complete();
                    } catch (Exception e) {
                        log.error("Streaming error: ", e);
                        emitter.completeWithError(e);
                    }
                    return null;
                });
    }

    // 안전 필터링 체크 로직 추가
    private boolean isBlocked(JsonNode node) {
        JsonNode candidate = node.path("candidates").get(0);
        if (candidate != null) {
            String finishReason = candidate.path("finishReason").asText();
            return "SAFETY".equals(finishReason) || "RECITATION".equals(finishReason);
        }
        return false;
    }

    private Map<String, Object> createRequestBody(
            String systemInstruction, List<Message> history, String currentQuestion) {

        List<Map<String, Object>> contents = new ArrayList<>();

        // 1. 대화 히스토리 추가
        for (Message msg : history) {
            contents.add(Map.of(
                    "role", msg.role().equals("assistant") ? "model" : "user",
                    "parts", List.of(Map.of("text", msg.content()))
            ));
        }

        // 2. 현재 질문 추가
        contents.add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", currentQuestion))
        ));

        // 3. 전체 구조 생성
        return Map.of(
                "system_instruction", Map.of(
                        "parts", List.of(Map.of("text", systemInstruction))
                ),
                "contents", contents,
                "generationConfig", Map.of(
                        "temperature", 0.7,
                        "topK", 40,
                        "topP", 0.95,
                        "maxOutputTokens", 1024
                )
        );
    }
}
