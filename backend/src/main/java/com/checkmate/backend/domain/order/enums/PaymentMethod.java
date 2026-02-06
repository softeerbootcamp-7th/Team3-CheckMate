package com.checkmate.backend.domain.order.enums;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum PaymentMethod {
    CARD("CARD", "카드"),
    CASH("CASH", "현금"),
    EASY_PAY("EASY_PAY", "간편결제"),
    ETC("ETC", "기타");

    private final String value; // DB / 외부 연동 값
    private final String description; // 화면 표시용

    PaymentMethod(String value, String description) {
        this.value = value;
        this.description = description;
    }

    public static PaymentMethod fromValue(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(values()).filter(v -> v.value.equals(value)).findFirst().orElse(null);
    }
}
