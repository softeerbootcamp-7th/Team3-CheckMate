package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_02 (주문건수) */
public record OrderCountResponse(
        Long orderCount, // 현재 기간 주문건수
        Long differenceOrderCount, // 주문건수 차이
        Double changeRate // 변화율 (%)
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
