package com.checkmate.backend.domain.menu.dto.request;

import com.checkmate.backend.domain.menu.dto.IngredientCommand;
import com.checkmate.backend.domain.menu.enums.Unit;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record IngredientUpdateRequestDTO(
        @Schema(description = "식재료들")
                @NotNull(message = "식재료는 적어도 하나 입력해야 합니다.")
                @Size(min = 1, message = "식재료는 적어도 하나 입력해야 합니다.")
                @Valid
                List<Ingredient> ingredients) {

    public record Ingredient(
            @Schema(description = "식재료 이름") @NotNull(message = "식재료 이름을 입력하세요.") @NotBlank
                    String name,
            @Schema(description = "용량")
                    @NotNull(message = "용량을 입력하세요")
                    @Max(value = 99999, message = "최대 5글자입니다.")
                    Integer quantity,
            @Schema(description = "단위") @NotNull(message = "단위를 입력하세요.") Unit unit)
            implements IngredientCommand {}
}
