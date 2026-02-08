package com.checkmate.backend.domain.analysis.dto.response;

/** MNU_04 (식자재 소진량) */
public record IngredientUsageResponse(
        String ingredientName, //  식자재 이름
        Long totalQuantity, // 식자재 소진량
        String baseUnit // ml or g
        ) {}
