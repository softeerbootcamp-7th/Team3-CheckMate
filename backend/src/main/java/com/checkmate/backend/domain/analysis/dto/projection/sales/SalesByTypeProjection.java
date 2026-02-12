package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_06 (판매유형별 매출) */
public record SalesByTypeProjection(
        String salesType, // 홀, 포장, 배달 등
        Long totalNetAmount, // 해당 판매 유형의 실매출 합계
        Long orderCount // 해당 판매 유형의 주문 건수
        ) {}
