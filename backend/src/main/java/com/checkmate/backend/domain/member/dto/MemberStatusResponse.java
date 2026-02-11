package com.checkmate.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 상태 정보 응답")
public record MemberStatusResponse(
        @Schema(description = "회원 이메일", example = "user@example.com")
        String email,

        @Schema(description = "상점 보유 여부", example = "true")
        boolean hasStore,

        @Schema(description = "POS 연동 여부", example = "false")
        boolean hasPosIntegration
) {}