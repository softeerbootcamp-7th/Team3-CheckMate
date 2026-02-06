package com.checkmate.backend.domain.order.enums;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum SalesType {
    DINE_IN("DINE_IN", "홀"),
    TAKE_OUT("TAKE_OUT", "포장"),
    DELIVERY("DELIVERY", "배달");

    private final String value; // DB 저장 값
    private final String description; // UI/표시용

    SalesType(String value, String description) {
        this.value = value;
        this.description = description;
    }

    // DB value로 Enum 가져오기
    public static SalesType fromValue(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(values()).filter(v -> v.value.equals(value)).findFirst().orElse(null);
    }
}
