package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** SLS_06_02, SLS_06_03 (이번주, 이번달 판매유형별 매출) */
public record SalesByTypeResponse(List<SalesByTypeItem> items // 판매 유형별 상세 리스트
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
