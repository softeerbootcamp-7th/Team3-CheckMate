package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** SLS_07_02, SLS_07_03 (이번주, 이번달 주문수단별 매출) */
public record SalesByOrderChannelResponse(List<SalesByOrderChannelItem> items // 주문수단별 상세 리스트
        ) implements DashboardAnalysisResponse, DetailAnalysisResponse {}
