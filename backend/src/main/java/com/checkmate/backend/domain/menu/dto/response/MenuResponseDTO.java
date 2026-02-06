package com.checkmate.backend.domain.menu.dto.response;

import com.checkmate.backend.domain.menu.entity.Menu;
import com.checkmate.backend.domain.menu.entity.MenuVersion;
import io.swagger.v3.oas.annotations.media.Schema;

public record MenuResponseDTO(
        @Schema(description = "메뉴 id") Long menuId,
        @Schema(description = "메뉴 이름") String name,
        @Schema(description = "가격") Integer price,
        @Schema(description = "식자재 등록 여부") boolean hasIngredients) {

    public static MenuResponseDTO of(MenuVersion menuVersion, boolean hasIngredients) {
        Menu menu = menuVersion.getMenu();

        return new MenuResponseDTO(
                menu.getId(), menu.getName(), menuVersion.getPrice(), hasIngredients);
    }
}
