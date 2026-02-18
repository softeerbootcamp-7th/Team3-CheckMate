package com.checkmate.backend.domain.menu.dto.response;

import com.checkmate.backend.domain.menu.entity.Ingredient;
import com.checkmate.backend.domain.menu.entity.Menu;
import com.checkmate.backend.domain.menu.entity.Recipe;
import com.checkmate.backend.domain.menu.enums.Unit;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MenuRecipeResponse(
        @Schema(description = "메뉴 이름") String menuName,
        @Schema(description = "식재료들") List<IngredientResponse> ingredients) {

    public record IngredientResponse(
            @Schema(description = "식재료 이름") String name,
            @Schema(description = "용량") Integer quantity,
            @Schema(description = "단위") Unit unit) {

        public static IngredientResponse of(Recipe recipe) {
            Ingredient ingredient = recipe.getIngredient();

            return new IngredientResponse(
                    ingredient.getName(), recipe.getQuantity(), Unit.fromValue(recipe.getUnit()));
        }

        public static IngredientResponse from(String name, Integer quantity, Unit unit) {
            return new IngredientResponse(name, quantity, unit);
        }
    }

    public static MenuRecipeResponse of(Menu menu, List<IngredientResponse> ingredients) {

        return new MenuRecipeResponse(menu.getName(), ingredients);
    }
}
