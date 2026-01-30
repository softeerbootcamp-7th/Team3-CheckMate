package com.checkmate.backend.domain.menu.dto.request;

import com.checkmate.backend.domain.menu.entity.Menu;
import com.checkmate.backend.domain.store.entity.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MenuCreateRequestDTO(@Schema(description = "메뉴 목록") List<MenuCreateDTO> menus) {

    public record MenuCreateDTO(
            @Schema(description = "메뉴명") String name,
            @Schema(description = "카테고리") String category,
            @Schema(description = "가격") Integer price) {

        public Menu toEntity(Store store) {
            return Menu.builder().name(this.name()).category(this.category()).store(store).build();
        }
    }
}
