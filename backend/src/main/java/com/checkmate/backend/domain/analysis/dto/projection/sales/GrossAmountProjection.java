package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_04 (총매출) */
public record GrossAmountProjection(
        Long grossAmount, // 총매출
        Long orderCount // 주문 건수
        ) {}
