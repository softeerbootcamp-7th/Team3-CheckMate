package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DomainCategory {
    SALES("매출"),
    MENU("메뉴"),
    WEATHER("날씨");

    private final String description;
}
