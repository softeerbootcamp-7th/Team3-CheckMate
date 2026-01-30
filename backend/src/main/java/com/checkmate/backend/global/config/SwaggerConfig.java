package com.checkmate.backend.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

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

        Server server = new Server();
        server.setUrl("http://localhost:8080");
        //        server.setUrl("https://api.korfit.co.kr");

        return new OpenAPI()
                .info(
                        new Info()
                                .title("CheckMate")
                                .description(
                                        "Softeer Team3 - Checkmate API Document - Backend Developer : 한울, 용범")
                                .version("2.0.0"))
                .components(
                        new Components()
                                .addSecuritySchemes(accessTokenHeader, accessTokenScheme)
                                .addSecuritySchemes(refreshTokenHeader, refreshTokenScheme))
                .addServersItem(server)
                .addSecurityItem(accessTokenRequirement)
                .addSecurityItem(refreshTokenRequirement);
    }
}
