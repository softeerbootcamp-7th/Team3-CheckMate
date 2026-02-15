package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_03 (건당 평균가) */
public record AverageOrderAmountResponse(
        Long averageOrderAmount, // 현재 기간 건당 평균가
        Long differenceAmount, // 평균가 차이
        boolean hasPreviousData)
        implements DashboardAnalysisResponse, DetailAnalysisResponse {}
