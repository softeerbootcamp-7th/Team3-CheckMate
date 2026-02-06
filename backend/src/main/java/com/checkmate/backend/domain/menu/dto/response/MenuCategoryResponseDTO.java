package com.checkmate.backend.domain.menu.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MenuCategoryResponseDTO(
        @Schema(description = "카테고리") String category,
        @Schema(description = "메뉴 목록") List<MenuResponseDTO> menus) {
    public static MenuCategoryResponseDTO of(String category, List<MenuResponseDTO> menus) {
        return new MenuCategoryResponseDTO(category, menus);
    }
}
