package com.checkmate.backend.domain.analysis.dto.response;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record DashboardAnalysisDataResponse(
        @Schema(description = "지표들") List<DashboardAnalysisItem> items) {

    public record DashboardAnalysisItem(
            @Schema(description = "지표 카드 id") AnalysisCardCode analysisCardCode,
            @Schema(description = "지표 데이터") DashboardAnalysisResponse dashboardAnalysisResponse) {}
}
