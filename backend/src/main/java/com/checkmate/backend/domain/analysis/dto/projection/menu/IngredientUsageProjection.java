package com.checkmate.backend.domain.analysis.dto.projection.menu;

/** MNU_04 (식자재 소진량) */
public record IngredientUsageProjection(
        Long ingredientId, // 식자재 id
        String ingredientName, //  식자재 이름
        Long totalQuantity // 식자재 소진량
        ) {}
