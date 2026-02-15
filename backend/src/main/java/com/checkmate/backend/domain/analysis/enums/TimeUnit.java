package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TimeUnit {
    DAY("day"),
    WEEK("week"),
    MONTH("month"),
    YEAR("year");

    private final String truncUnit;
}
