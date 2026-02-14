package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;

/** SLS_14_06 (요일별 매출) */
public record DashboardSalesByDayResponse(
        String day, double avgNetAmount, long orderCount, String topDay, boolean isSignificant)
        implements DashboardAnalysisResponse {}
