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

    /** 이 Unit의 낮은 단위(Unit) 반환 */
    public Unit baseUnit() {
        return switch (this) {
            case G, KG -> G;
            case ML, L -> ML;
        };
    }

    /** 이 Unit의 낮은 단위 문자열 반환 */
    public String baseUnitValue() {
        return baseUnit().value;
    }
}
