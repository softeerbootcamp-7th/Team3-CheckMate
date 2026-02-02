package com.checkmate.backend.domain.order.enums;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum PaymentStatus {
    PAID("PAID", "결제완료"),
    PARTIAL_REFUND("PARTIAL_REFUND", "부분환불"),
    FULL_REFUND("FULL_REFUND", "전체환불");

    private final String value;
    private final String description;

    PaymentStatus(String value, String description) {
        this.value = value;
        this.description = description;
    }

    public static PaymentStatus fromValue(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(values()).filter(v -> v.value.equals(value)).findFirst().orElse(null);
    }
}
