package com.checkmate.backend.domain.analysis.dto.response;

/** MNU_02 (카테코리별 매출) */
public record CategorySalesResponse(
        String category, // 메뉴 카테고리 이름
        Long totalSalesAmount // 총 매출액
        ) {}
