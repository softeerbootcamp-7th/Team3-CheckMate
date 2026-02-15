package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** SLS_13_01 (피크타임) */
public record DetailPeakTimeResponse(List<PeakTimeItem> items // 시간대별 주문건수 및 실매출
        ) implements DetailAnalysisResponse {}
