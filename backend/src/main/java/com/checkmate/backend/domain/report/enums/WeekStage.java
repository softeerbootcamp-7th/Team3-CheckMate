package com.checkmate.backend.domain.report.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WeekStage {
    STAGE_0_2("0_2", 0, 14),

    STAGE_3_4("3_4", 15, 28),

    STAGE_5_PLUS("5_plus", 29, Integer.MAX_VALUE);

    private final String code;
    private final int minDays;
    private final int maxDays;

    public static WeekStage fromDaysOpen(long daysOpen) {
        if (daysOpen <= 14) return STAGE_0_2;
        if (daysOpen <= 28) return STAGE_3_4;
        return STAGE_5_PLUS;
    }
}
