package com.checkmate.backend.domain.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record BusinessVerifyResponseDTO(
    @Schema(description = "사업자등록번호 검증 성공 시 발급되는 인증 토큰 (온보딩/매장 등록 시 사용)")
        String businessAuthToken) {}
