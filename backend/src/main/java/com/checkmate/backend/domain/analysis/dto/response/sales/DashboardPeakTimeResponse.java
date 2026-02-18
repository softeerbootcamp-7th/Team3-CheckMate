package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.ShiftDirection;

/** SLS_13_01 (피크타임) */
public record DashboardPeakTimeResponse(
        int timeSlot2H, // 2시간 슬롯
        double orderCount, // 주문 건수
        double netAmount, // 실매출
        Integer todayPeak, // 오늘 peak 시간
        Integer comparisonPeak, // 비교 기간 peak 시간
        Integer diff, // |todayPeak - comparisonPeak|
        ShiftDirection shiftDirection, // 비교 기간 대비 peak 이동 방향
        boolean beforeComparisonPeak // 현재 시간이 비교 기간 peak 이전인지
        ) implements DashboardAnalysisResponse {}
