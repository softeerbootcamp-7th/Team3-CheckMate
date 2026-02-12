package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.IngredientUsageProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.IngredientUsageResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.menu.entity.Ingredient;
import com.checkmate.backend.domain.menu.repository.IngredientRepository;
import com.checkmate.backend.domain.order.repository.MenuAnalysisRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** MNU_04 (식자재 소진량) */
@Component
@RequiredArgsConstructor
@Slf4j
public class IngredientUsageProcessor implements AnalysisProcessor<MenuAnalysisContext> {
    private final MenuAnalysisRepository menuAnalysisRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.MNU_04 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(MenuAnalysisContext context) {

        // 식재료 사용량 갖고 온다.
        List<IngredientUsageProjection> ingredientUsageProjections =
                menuAnalysisRepository.findIngredientUsage(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        List<Long> ingredientIds =
                ingredientUsageProjections.stream()
                        .map(IngredientUsageProjection::ingredientId)
                        .toList();

        List<Ingredient> ingredients = ingredientRepository.findAllByIds(ingredientIds);

        List<IngredientUsageResponse.IngredientUsageItem> ingredientUsageItems = new ArrayList<>();

        for (IngredientUsageProjection ingredientUsageProjection : ingredientUsageProjections) {
            Long ingredientId = ingredientUsageProjection.ingredientId();

            String baseUnit =
                    ingredients.stream()
                            .filter(ingredient -> ingredient.getId().equals(ingredientId)) // ID로 필터
                            .map(Ingredient::getBaseUnit) // baseUnit으로 매핑
                            .findFirst() // 첫 번째 찾기
                            .orElse(null); // 없으면 null 반환

            ingredientUsageItems.add(
                    new IngredientUsageResponse.IngredientUsageItem(
                            ingredientUsageProjection.ingredientName(),
                            ingredientUsageProjection.totalQuantity(),
                            baseUnit));
        }

        IngredientUsageResponse response = new IngredientUsageResponse(ingredientUsageItems);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
