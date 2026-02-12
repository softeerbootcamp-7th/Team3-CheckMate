package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Period {
    TODAY("오늘"),
    THIS_WEEK("이번주"),
    THIS_MONTH("이번달"),
    LAST_7_DAYS("최근 7일"),
    LAST_14_DAYS("최근 14일"),
    LAST_30_DAYS("최근 30일"),
    LAST_8_WEEKS("최근 8주"),
    LAST_6_MONTHS("최근 6개월"),
    LAST_4_WEEKS("최근 4주"),
    LAST_365_DAYS("최근 365일"),
    LAST_3_YEARS("최근 3년"),
    ;

    private final String displayName;
}
