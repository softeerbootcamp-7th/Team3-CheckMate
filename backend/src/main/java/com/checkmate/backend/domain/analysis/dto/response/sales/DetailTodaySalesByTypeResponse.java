package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** 상세분석 SLS_06_1 (오늘 판매유형별 매출) */
public record DetailTodaySalesByTypeResponse(List<SalesByTypeItem> items // 판매 유형별 상세 리스트
        ) implements DetailAnalysisResponse {}
