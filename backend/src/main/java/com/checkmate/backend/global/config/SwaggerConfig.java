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
        // Access Token Bearer 인증 스키마 설정
        SecurityScheme accessTokenScheme =
                new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .in(SecurityScheme.In.HEADER)
                        .name(accessTokenHeader);

        // Refresh Token Bearer 인증 스키마 설정
        SecurityScheme refreshTokenScheme =
                new SecurityScheme()
                        .type(SecurityScheme.Type.APIKEY)
                        .in(SecurityScheme.In.HEADER)
                        .name(refreshTokenHeader);

        // SecurityRequirement 설정 - 각 토큰별 인증 요구사항 추가
        SecurityRequirement accessTokenRequirement =
                new SecurityRequirement().addList(accessTokenHeader);
        SecurityRequirement refreshTokenRequirement =
                new SecurityRequirement().addList(refreshTokenHeader);

        // 1. 운영 서버 설정
        Server prodServer = new Server();
        prodServer.setUrl("https://api-check-mate.kro.kr");
        prodServer.setDescription("운영 서버");

        // 2. 로컬 서버 설정
        Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("로컬 환경");

        return new OpenAPI()
                .info(
                        new Info()
                                .title("CheckMate")
                                .description(
                                        "Softeer Team3 - Checkmate API Document - Backend Developer : 한울, 용범")
                                .version("0.2.3"))
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

                                                            if (path.startsWith("/api")
                                                                    || path.equals("/auth/status")
                                                                    || path.startsWith(
                                                                            "/auth/refresh")
                                                                    || path.startsWith(
                                                                            "/auth/logout")) {
                                                                addJwtAuthErrors(responses);
                                                            }

                                                            if (path.startsWith("/api/analysis")
                                                                    || path.startsWith(
                                                                            "/api/sse")) {
                                                                addStoreCheckErrors(responses);
                                                            }
                                                        }));
    }

    private void addJwtAuthErrors(ApiResponses responses) {
        responses.addApiResponse(
                "401",
                new ApiResponse()
                        .description("토큰 오류")
                        .content(
                                new Content()
                                        .addMediaType(
                                                "application/json",
                                                new MediaType()
                                                        .addExamples(
                                                                "JWT_TOKEN_NOT_FOUND",
                                                                createExample(
                                                                        "토큰 누락",
                                                                        "JWT 토큰이 존재하지 않습니다.",
                                                                        "JWT_TOKEN_NOT_FOUND"))
                                                        .addExamples(
                                                                "EXPIRED_JWT_TOKEN",
                                                                createExample(
                                                                        "토큰 만료",
                                                                        "만료된 JWT 토큰입니다.",
                                                                        "EXPIRED_JWT_TOKEN"))
                                                        .addExamples(
                                                                "INVALID_JWT_SIGNATURE",
                                                                createExample(
                                                                        "서명 불일치",
                                                                        "유효하지 않은 JWT 서명입니다.",
                                                                        "INVALID_JWT_SIGNATURE"))
                                                        .addExamples(
                                                                "INVALID_JWT_TOKEN",
                                                                createExample(
                                                                        "잘못된 형식",
                                                                        "잘못된 JWT 토큰입니다.",
                                                                        "INVALID_JWT_TOKEN"))
                                                        .addExamples(
                                                                "UNSUPPORTED_JWT_TOKEN",
                                                                createExample(
                                                                        "지원되지 않는 토큰",
                                                                        "지원되지 않는 JWT 토큰입니다.",
                                                                        "UNSUPPORTED_JWT_TOKEN")))));
    }

    private void addStoreCheckErrors(ApiResponses responses) {
        responses.addApiResponse(
                "403",
                new ApiResponse()
                        .description("권한 오류: 매장 등록 상태 확인")
                        .content(
                                new Content()
                                        .addMediaType(
                                                "application/json",
                                                new MediaType()
                                                        .addExamples(
                                                                "STORE_NOT_REGISTERED",
                                                                createExample(
                                                                        "매장 미등록",
                                                                        "등록된 매장이 없습니다. 매장 등록 후 이용해주세요.",
                                                                        "STORE_NOT_REGISTERED")))));
    }

    private Example createExample(String summary, String message, String errorCode) {
        Map<String, Object> errorResponse = new LinkedHashMap<>();
        errorResponse.put("success", false);
        errorResponse.put("message", message);
        errorResponse.put("errorCode", errorCode);

        return new Example().summary(summary).value(errorResponse);
    }
}
