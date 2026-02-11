package com.checkmate.backend.domain.analysis.dto.response.sales;

/** SLS_03 (건당 평균가) */
public record AverageOrderAmountResponse(
        Long averageOrderAmount, // 현재 기간 건당 평균가
        Long differenceAmount // 평균가 차이
        ) {}
