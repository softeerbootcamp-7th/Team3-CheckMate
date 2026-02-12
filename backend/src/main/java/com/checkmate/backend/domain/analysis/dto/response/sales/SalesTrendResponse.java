package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_09_04 (일별 매출 추이) SLS_10_07 (주별 매출 추이) SLS_11_07 (월별 매출 추이) SLS_12_01 (연별 매출 추이) */
public record SalesTrendResponse(
        long netAmount, // 실매출 합계
        long orderCount // 주문 건수
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
