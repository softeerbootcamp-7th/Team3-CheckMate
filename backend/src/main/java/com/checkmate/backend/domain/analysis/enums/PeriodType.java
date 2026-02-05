package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PeriodType {
    FIXED("고정 기간"),
    ROLLING("롤링 기간"),
    MIXED("혼합");

    private final String description;
}
