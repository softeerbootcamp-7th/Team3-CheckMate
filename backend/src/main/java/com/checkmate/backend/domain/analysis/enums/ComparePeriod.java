package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ComparePeriod {
    LAST_WEEK_SAME_DAY("지난주 동일요일"),
    LAST_WEEK("지난주"),
    LAST_MONTH("지난달"),
    LAST_7_DAYS_AVG("최근 7일 평균"),
    LAST_4_WEEKS_SAME_DAY_AVG("최근 4주 동일요일 평균"),
    NONE("없음");

    private final String description;
}
