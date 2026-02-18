package com.checkmate.backend.domain.store.validator;

import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.enums.DayOfWeekType;
import com.checkmate.backend.global.util.TimeUtil;
import com.checkmate.backend.global.validator.ValidatorUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import org.springframework.util.StringUtils;

public class WeeklyBusinessHoursValidator
        implements ConstraintValidator<
                ValidWeeklyBusinessHours, List<StoreCreateRequestDTO.BusinessHourRequest>> {

    @Override
    public boolean isValid(
            List<StoreCreateRequestDTO.BusinessHourRequest> hours,
            ConstraintValidatorContext context) {

        // 기본 메시지 비활성화 (커스텀 메시지만 사용)
        context.disableDefaultConstraintViolation();

        // 1. null / empty 검증
        if (hours == null || hours.isEmpty()) {
            ValidatorUtils.addErrorMessage(context, "영업시간은 월~일 모두 입력해야 합니다.");
            return false;
        }

        // 2. 요일 중복 제거 + 월~일 모두 존재 검증
        Map<DayOfWeekType, StoreCreateRequestDTO.BusinessHourRequest> map =
                new EnumMap<>(DayOfWeekType.class);

        for (StoreCreateRequestDTO.BusinessHourRequest hour : hours) {
            DayOfWeekType day = hour.dayOfWeek();

            if (map.containsKey(day)) {
                ValidatorUtils.addErrorMessage(context, "요일별 영업시간은 중복될 수 없습니다.");
                return false;
            }

            map.put(day, hour);
        }

        if (map.size() != DayOfWeekType.values().length) {
            ValidatorUtils.addErrorMessage(context, "영업시간은 월~일 모두 입력해야 합니다.");
            return false;
        }

        // 3. 각 요일 단위 검증
        for (StoreCreateRequestDTO.BusinessHourRequest hour : map.values()) {
            boolean closed = hour.closed();
            String open = hour.openTime();
            String close = hour.closeTime();
            boolean open24Hours = hour.open24Hours();

            if (closed || open24Hours) {
                continue;
            }

            // 3-1. 영업일이면 open / close 필수
            if (!StringUtils.hasText(open) || !StringUtils.hasText(close)) {
                ValidatorUtils.addErrorMessage(
                        context, hour.dayOfWeek() + "의 영업 시작/마감 시간을 입력해주세요.");
                return false;
            }

            int openMinutes = TimeUtil.toMinutes(open);
            int closeMinutes = TimeUtil.toMinutes(close);

            // 3-2. 시작/마감 동일 불가

            if (openMinutes == closeMinutes && openMinutes != 0) {
                ValidatorUtils.addErrorMessage(
                        context, hour.dayOfWeek() + "의 영업 시작 시간과 마감 시간은 같을 수 없습니다.");
                return false;
            }
        }

        // 4. 연속 요일 영업시간 겹침 검증 (자정 이후만 대상)
        for (DayOfWeekType day : DayOfWeekType.values()) {
            StoreCreateRequestDTO.BusinessHourRequest today = map.get(day);
            StoreCreateRequestDTO.BusinessHourRequest next = map.get(day.next());

            if (today.closed() || next.closed() || today.open24Hours() || next.open24Hours()) {
                continue;
            }

            int todayOpen = TimeUtil.toMinutes(today.openTime());
            int todayClose = TimeUtil.toMinutes(today.closeTime());
            int nextOpen = TimeUtil.toMinutes(next.openTime());

            // 자정 이후 마감한 경우만 검사
            if (todayOpen > todayClose) {
                if (nextOpen <= todayClose) {
                    ValidatorUtils.addErrorMessage(
                            context,
                            day
                                    + "과 "
                                    + day.next()
                                    + "의 영업시간이 겹칩니다. 다음 요일의 시작 시간은 이전 요일 마감 이후여야 합니다.");
                    return false;
                }
            }
        }

        return true;
    }
}
