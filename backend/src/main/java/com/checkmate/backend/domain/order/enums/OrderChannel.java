package com.checkmate.backend.domain.order.enums;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum OrderChannel {
    POS("POS", "POS"),
    KIOSK("KIOSK", "키오스크"),
    DELIVERY_APP("DELIVERY_APP", "배달앱"),
    ETC("ETC", "기타");

    private final String value; // DB 저장 값
    private final String description; // UI/표시용

    OrderChannel(String value, String description) {
        this.value = value;
        this.description = description;
    }

    // DB value로 Enum 가져오기
    public static OrderChannel fromValue(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(values()).filter(v -> v.value.equals(value)).findFirst().orElse(null);
    }
}
