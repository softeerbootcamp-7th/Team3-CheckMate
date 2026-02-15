package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_04 (총매출) */
public record GrossAmountResponse(
        long grossAmount, // 총매출
        long orderCount // 주문건수
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
