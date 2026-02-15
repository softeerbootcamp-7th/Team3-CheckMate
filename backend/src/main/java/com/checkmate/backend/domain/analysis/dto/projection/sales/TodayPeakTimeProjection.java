package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_13_01 (피크타임) */
public record TodayPeakTimeProjection(
        Integer timeSlot2H, // 2시간 슬롯
        Long netAmount, // 실매출
        Long orderCount // 주문 건수
        ) {}
