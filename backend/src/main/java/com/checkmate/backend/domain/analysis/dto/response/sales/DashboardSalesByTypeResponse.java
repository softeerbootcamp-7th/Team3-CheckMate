package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import java.util.List;

/** 대시보드 SLS_06 (판매유형별 매출) */
public record DashboardSalesByTypeResponse(
        SalesInsight insight, List<SalesByTypeItem> items // 판매 유형별 상세 리스트
        ) implements DashboardAnalysisResponse {}
