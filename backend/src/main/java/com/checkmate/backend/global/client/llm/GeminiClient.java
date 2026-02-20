package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.domain.chat.dto.Message;
import com.checkmate.backend.global.client.BaseClient;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

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
}
