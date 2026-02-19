package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** MNU_04 (식자재 소진량) */
public record IngredientUsageResponse(
        boolean hasIngredient, // 매장 식재료 등록 여부
        List<IngredientUsageItem> items)
        implements DashboardAnalysisResponse, DetailAnalysisResponse {

    public record IngredientUsageItem(
            String ingredientName, // 식자재 이름
            Long totalQuantity, // 총 소진량
            String baseUnit // 단위 (g, ml 등)
            ) {}
}
