package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_14_06 (요일별 매출) */
public record SalesByDayProjection(
        Integer day, // 요일
        Double avgNetAmount, // 실매출 평균
        Long orderCount // 주문건수
        ) {}
