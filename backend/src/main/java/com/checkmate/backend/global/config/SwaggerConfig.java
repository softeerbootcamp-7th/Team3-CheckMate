package com.checkmate.backend.global.config;

import com.checkmate.backend.global.auth.LoginMember;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    static {
        SpringDocUtils.getConfig().addAnnotationsToIgnore(LoginMember.class);
    }

    @Value("${jwt.access.header}")
    private String accessTokenHeader;

    @Value("${jwt.refresh.header}")
    private String refreshTokenHeader;

    @Bean
    public OpenAPI openAPI() {
        SecurityScheme accessTokenScheme =
                new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .in(SecurityScheme.In.HEADER)
                        .name(accessTokenHeader);

        SecurityScheme refreshTokenScheme =
                new SecurityScheme()
                        .type(SecurityScheme.Type.APIKEY)
                        .in(SecurityScheme.In.HEADER)
                        .name(refreshTokenHeader);

        SecurityRequirement accessTokenRequirement =
                new SecurityRequirement().addList(accessTokenHeader);
        SecurityRequirement refreshTokenRequirement =
                new SecurityRequirement().addList(refreshTokenHeader);

        Server prodServer = new Server();
        prodServer.setUrl("https://api-check-mate.kro.kr");
        prodServer.setDescription("운영 서버");

        Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("로컬 환경");

        return new OpenAPI()
                .info(
                        new Info()
                                .title("CheckMate")
                                .description(
                                        "Softeer Team3 - Checkmate API Document - Backend Developer : 한울, 용범")
                                .version("0.2.4"))
                .components(
                        new Components()
                                .addSecuritySchemes(accessTokenHeader, accessTokenScheme)
                                .addSecuritySchemes(refreshTokenHeader, refreshTokenScheme))
                .addServersItem(prodServer)
                .addServersItem(localServer)
                .addSecurityItem(accessTokenRequirement)
                .addSecurityItem(refreshTokenRequirement);
    }

    @Bean
    public OpenApiCustomizer globalResponseCustomizer() {
        return openApi ->
                openApi.getPaths()
                        .forEach(
                                (path, value) ->
                                        value.readOperations()
                                                .forEach(
                                                        operation -> {
                                                            ApiResponses responses =
                                                                    operation.getResponses();

                                                            // 1. JWT 인증 관련 에러 (401)
                                                            if (path.startsWith("/api")
                                                                    || path.equals("/auth/status")
                                                                    || path.startsWith(
                                                                            "/auth/logout")) {
                                                                addJwtAuthErrors(responses);
                                                            }

                                                            // 2. 매장 권한 관련 에러 (403)
                                                            if (path.startsWith("/api/analysis")
                                                                    || path.startsWith(
                                                                            "/api/sse")) {
                                                                addStoreCheckErrors(responses);
                                                            }
                                                        }));
    }

    // 401 에러 병합 로직
    private void addJwtAuthErrors(ApiResponses responses) {
        // 미리 정의해둔 예시들
        Example jwtTokenNotFound =
                createExample("토큰 누락", "JWT 토큰이 존재하지 않습니다.", "JWT_TOKEN_NOT_FOUND");
        Example expiredJwtToken = createExample("토큰 만료", "만료된 JWT 토큰입니다.", "EXPIRED_JWT_TOKEN");
        Example invalidJwtSignature =
                createExample("서명 불일치", "유효하지 않은 JWT 서명입니다.", "INVALID_JWT_SIGNATURE");
        Example invalidJwtToken = createExample("잘못된 형식", "잘못된 JWT 토큰입니다.", "INVALID_JWT_TOKEN");
        Example unsupportedJwtToken =
                createExample("지원되지 않는 토큰", "지원되지 않는 JWT 토큰입니다.", "UNSUPPORTED_JWT_TOKEN");

        // 1. 기존 401 응답 가져오기 또는 생성
        ApiResponse apiResponse =
                responses.computeIfAbsent("401", key -> new ApiResponse().description("토큰 오류"));

        // 2. Content 및 MediaType("application/json") 확보
        MediaType mediaType = getOrCreateMediaType(apiResponse);

        // 3. 예시 병합 (기존에 없는 키만 추가)
        addExampleIfNotPresent(mediaType, "JWT_TOKEN_NOT_FOUND", jwtTokenNotFound);
        addExampleIfNotPresent(mediaType, "EXPIRED_JWT_TOKEN", expiredJwtToken);
        addExampleIfNotPresent(mediaType, "INVALID_JWT_SIGNATURE", invalidJwtSignature);
        addExampleIfNotPresent(mediaType, "INVALID_JWT_TOKEN", invalidJwtToken);
        addExampleIfNotPresent(mediaType, "UNSUPPORTED_JWT_TOKEN", unsupportedJwtToken);
    }

    // 403 에러 병합 로직
    private void addStoreCheckErrors(ApiResponses responses) {
        Example storeNotRegistered =
                createExample("매장 미등록", "등록된 매장이 없습니다. 매장 등록 후 이용해주세요.", "STORE_NOT_REGISTERED");

        // 1. 기존 403 응답 가져오기 또는 생성
        ApiResponse apiResponse =
                responses.computeIfAbsent(
                        "403", key -> new ApiResponse().description("권한 오류: 매장 등록 상태 확인"));

        // 2. Content 및 MediaType("application/json") 확보
        MediaType mediaType = getOrCreateMediaType(apiResponse);

        // 3. 예시 병합
        addExampleIfNotPresent(mediaType, "STORE_NOT_REGISTERED", storeNotRegistered);
    }

    // --- Helper Methods (중복 제거 및 안전한 객체 접근) ---

    // ApiResponse에서 Content -> MediaType("application/json")을 안전하게 가져오거나 생성하는 메서드
    private MediaType getOrCreateMediaType(ApiResponse apiResponse) {
        Content content = apiResponse.getContent();
        if (content == null) {
            content = new Content();
            apiResponse.setContent(content);
        }

        MediaType mediaType = content.get("application/json");
        if (mediaType == null) {
            mediaType = new MediaType();
            content.addMediaType("application/json", mediaType);
        }
        return mediaType;
    }

    // 이미 존재하는 Example 키(이름)가 아닐 경우에만 추가하는 메서드
    private void addExampleIfNotPresent(MediaType mediaType, String key, Example example) {
        Map<String, Example> examples = mediaType.getExamples();
        if (examples == null) {
            mediaType.addExamples(key, example);
        } else if (!examples.containsKey(key)) {
            mediaType.addExamples(key, example);
        }
    }

    private Example createExample(String summary, String message, String errorCode) {
        Map<String, Object> errorResponse = new LinkedHashMap<>();
        errorResponse.put("success", false);
        errorResponse.put("message", message);
        errorResponse.put("errorCode", errorCode);

        return new Example().summary(summary).value(errorResponse);
    }
}
