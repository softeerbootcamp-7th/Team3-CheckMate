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

    /** value로 Unit 조회, 없으면 null 반환 */
    public static Unit fromValue(String value) {
        for (Unit unit : values()) {
            if (unit.value.equalsIgnoreCase(value)) {
                return unit;
            }
        }
        return null;
    }
}
