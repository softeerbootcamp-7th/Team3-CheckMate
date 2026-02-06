package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DataType {
    MONEY("원"),
    COUNT("건"),
    VOLUME("사용량"),
    PERCENT("%"),
    TIME("시"),
    TEMP("°C"),
    NONE("없음");

    private final String unit;
}
