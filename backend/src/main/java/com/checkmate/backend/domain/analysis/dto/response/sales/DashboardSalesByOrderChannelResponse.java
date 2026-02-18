package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import java.util.List;

/** 대시보드 SLS_07 (주문수단별 매출) */
public record DashboardSalesByOrderChannelResponse(
        SalesInsight insight, List<SalesByOrderChannelItem> items // 주문수단별 유형별 상세 리스트
        ) implements DashboardAnalysisResponse {}
