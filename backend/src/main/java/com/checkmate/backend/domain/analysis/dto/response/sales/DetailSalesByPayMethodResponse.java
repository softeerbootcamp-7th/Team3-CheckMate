package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** 상세분석 SLS_08 (결제수단별 매출) */
public record DetailSalesByPayMethodResponse(List<SalesByPayMethodItem> items // 결제수단별 유형별 상세 리스트
        ) implements DetailAnalysisResponse {}
