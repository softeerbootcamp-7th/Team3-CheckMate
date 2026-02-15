package com.checkmate.backend.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TimeUtil {
    public static int toMinutes(String time) {
        if (time == null || time.isBlank()) return 0;
        if ("24:00".equals(time)) return 24 * 60;

        String[] t = time.split(":");
        return Integer.parseInt(t[0]) * 60 + Integer.parseInt(t[1]);
    }

    public static boolean isNextDay(String openTime, String closeTime) {
        return toMinutes(closeTime) <= toMinutes(openTime);
    }

    /**
     * 2시간 단위 슬롯 계산
     *
     * <p>hour / 2 * 2 로 0~23시를 매핑
     *
     * <p>예시: 0,1 -> 0 2,3 -> 2 4,5 -> 4 6,7 -> 6 8,9 -> 8 10,11 -> 10 12,13 -> 12 14,15 -> 14 16,17
     * -> 16 18,19 -> 18 20,21 -> 20 22,23 -> 22
     */
    public static int get2HourSlot(LocalDateTime orderedAt) {
        int hour = orderedAt.getHour();
        return hour / 2 * 2;
    }

    public static int getDayOfWeekValue(LocalDate date) {
        return date.getDayOfWeek().getValue();
    }
}
