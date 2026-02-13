package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.global.client.BaseClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public GeminiClient(RestClient.Builder restClientBuilder, ObjectMapper objectMapper) {
        super(restClientBuilder, objectMapper, "https://generativelanguage.googleapis.com");
    }

    @Override
    public String ask(String systemInstruction, String userMessage) {
        String uri = String.format("/v1beta/models/%s:generateContent?key=%s", modelName, apiKey);

        // 공식 문서의 JSON 구조 그대로 매핑
        Map<String, Object> requestBody =
                Map.of(
                        "system_instruction",
                                Map.of("parts", List.of(Map.of("text", systemInstruction))),
                        "contents", List.of(Map.of("parts", List.of(Map.of("text", userMessage)))),
                        "generationConfig",
                                Map.of(
                                        "responseMimeType",
                                        "application/json",
                                        "temperature",
                                        1.0,
                                        "thinkingConfig",
                                        Map.of("thinkingLevel", "low")));

        JsonNode response = post(uri, Map.of(), requestBody, JsonNode.class);

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
            throw new RuntimeException("Gemini Data Extraction Error");
        }
    }
}
