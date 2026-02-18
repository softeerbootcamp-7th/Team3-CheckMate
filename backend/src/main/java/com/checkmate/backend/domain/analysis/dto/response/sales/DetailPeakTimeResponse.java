package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.ShiftDirection;
import java.util.List;

/** SLS_13_01 (피크타임) */
public record DetailPeakTimeResponse(
        List<PeakTimeItem> todayItems,
        List<PeakTimeItem> week4Items,
        Integer todayPeak, // 오늘 peak 시간
        Integer comparisonPeak, // 비교 기간 peak 시간
        Integer diff, // |todayPeak - comparisonPeak|
        ShiftDirection shiftDirection, // 비교 기간 대비 peak 이동 방향
        boolean beforeComparisonPeak // 현재 시간이 비교 기간 peak 이전인지
        ) implements DetailAnalysisResponse {}
