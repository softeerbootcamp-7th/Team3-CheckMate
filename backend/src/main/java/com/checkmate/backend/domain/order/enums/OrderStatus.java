package com.checkmate.backend.domain.order.enums;

import lombok.Getter;

@Getter
public enum OrderStatus {
    COMPLETE("COMPLETE", "완료"),
    CANCEL("CANCEL", "취소");

    private final String value;
    private final String description;

    OrderStatus(String value, String description) {
        this.value = value;
        this.description = description;
    }
}
