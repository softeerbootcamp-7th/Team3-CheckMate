package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** SLS_14_06 (요일별 매출) */
public record DetailSalesByDayResponse(List<SalesByDayItem> items)
        implements DetailAnalysisResponse {}
