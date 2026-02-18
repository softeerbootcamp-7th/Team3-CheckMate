package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_13_01 (피크타임) */
public record PeakTimeAvgProjection(
        Integer timeSlot2H, // 2시간 슬롯
        Long netAmount, // 실매출 평균
        Long orderCount, // 주문건수 평균
        Long operatingWeeks // 운영주차
        ) {}
