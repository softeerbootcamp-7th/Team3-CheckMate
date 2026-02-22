package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;

/** SLS_05 (할인 & 취소) */
public record DiscountAndCancelResponse(
        long discountCount, // 할인 건수
        long cancelCount, // 취소 건수
        long discountAmount, // 할인 금액
        long canceledAmount // 취소 금액
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
