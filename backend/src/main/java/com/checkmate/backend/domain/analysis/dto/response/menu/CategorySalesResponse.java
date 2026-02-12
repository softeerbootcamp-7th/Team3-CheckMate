package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.projection.CategorySalesProjection;
import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** MNU_02 (카테코리별 매출) */
public record CategorySalesResponse(List<CategorySalesItem> items)
        implements DashboardAnalysisResponse, DetailAnalysisResponse {

    public record CategorySalesItem(String category, Long totalSalesAmount) {

        public static CategorySalesItem of(CategorySalesProjection projection) {
            return new CategorySalesItem(projection.category(), projection.totalSalesAmount());
        }
    }
}
