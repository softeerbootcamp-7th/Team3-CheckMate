package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_05 (할인 & 취소) */
public record DiscountAndCancelResponse(
        long orderCount, // 주문건수
        long discountAmount, // 할인
        long canceledAmount // 취소
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
