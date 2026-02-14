package com.checkmate.backend.global.util;

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
}
