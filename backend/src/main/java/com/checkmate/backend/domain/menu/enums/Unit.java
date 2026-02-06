package com.checkmate.backend.domain.menu.enums;

import lombok.Getter;

@Getter
public enum Unit {
    G("g"),
    KG("kg"),
    ML("ml"),
    L("l");

    private final String value;

    Unit(String value) {
        this.value = value;
    }

    public int normalize(int quantity) {
        return switch (this) {
            case G, ML -> quantity;
            case KG, L -> quantity * 1000;
        };
    }
}
