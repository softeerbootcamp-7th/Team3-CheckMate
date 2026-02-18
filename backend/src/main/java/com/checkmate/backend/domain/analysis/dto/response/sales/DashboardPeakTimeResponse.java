package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.ShiftDirection;

/** SLS_13_01 (피크타임) */
public record DashboardPeakTimeResponse(
        int timeSlot2H, // 2시간 슬롯
        long orderCount, // 주문 건수
        long netAmount, // 실매출
        Integer todayPeak,
        Integer comparisonPeak,
        Integer diff,
        ShiftDirection shiftDirection,
        boolean beforeComparisonPeak)
        implements DashboardAnalysisResponse {}
