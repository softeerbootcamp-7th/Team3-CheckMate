package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_01 (실매출) */
public record NetAmountResponse(
        Long netAmount, // 실매출
        Long differenceAmount, // 비교 기간 대비 차액
        Double changeRate // 변화율 (%)
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
