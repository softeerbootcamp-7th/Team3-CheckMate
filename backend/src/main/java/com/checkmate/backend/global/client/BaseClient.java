package com.checkmate.backend.global.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

@Slf4j
public abstract class BaseClient {
    protected final RestClient restClient;
    protected final ObjectMapper objectMapper;

    protected BaseClient(
            RestClient.Builder restClientBuilder, ObjectMapper objectMapper, String baseUrl) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.objectMapper = objectMapper;
    }

    // 공통 GET 요청
    protected <T> T get(String uri, Map<String, String> headers, Class<T> responseType) {
        return restClient
                .get()
                .uri(uri)
                .headers(h -> headers.forEach(h::add))
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleError)
                .body(responseType);
    }

    // 공통 POST 요청
    protected <T> T post(
            String uri, Map<String, String> headers, Object body, Class<T> responseType) {
        return restClient
                .post()
                .uri(uri)
                .headers(h -> headers.forEach(h::add))
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleError)
                .body(responseType);
    }

    private void handleError(HttpRequest request, ClientHttpResponse response) throws IOException {
        log.error("API 호출 실패: {} {}", response.getStatusCode(), response.getStatusText());
        throw new RuntimeException("External API Error: " + response.getStatusCode());
    }
}
