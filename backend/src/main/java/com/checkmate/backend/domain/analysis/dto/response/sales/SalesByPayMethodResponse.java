package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** SLS_08_02, SLS_08_03 (이번주, 이번달 결제수단별 매출) */
public record SalesByPayMethodResponse(List<SalesByPayMethodItem> items // 결제수단별 상세 리스트
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
