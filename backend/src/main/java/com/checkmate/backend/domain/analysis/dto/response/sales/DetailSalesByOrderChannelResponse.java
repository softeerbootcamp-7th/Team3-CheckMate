package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** 상세분석 SLS_07 (주문수단별 매출) */
public record DetailSalesByOrderChannelResponse(List<SalesByOrderChannelItem> items // 주무수단별 상세 리스트
        ) implements DetailAnalysisResponse {}
