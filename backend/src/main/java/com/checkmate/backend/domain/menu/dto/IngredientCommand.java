package com.checkmate.backend.domain.menu.dto;

import com.checkmate.backend.domain.menu.enums.Unit;

public interface IngredientCommand {
    String name();

    Integer quantity();

    Unit unit();
}
