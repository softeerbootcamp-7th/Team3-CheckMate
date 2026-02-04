package com.checkmate.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 성공 응답 DTO")
public record LoginResponse(
        @Schema(description = "JWT 액세스 토큰 (Bearer)", example = "eyJhbGciOiJIUzI1NiJ9...")
                String accessToken) {}
