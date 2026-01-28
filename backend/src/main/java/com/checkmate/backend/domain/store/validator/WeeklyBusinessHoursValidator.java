package com.checkmate.backend.domain.store.validator;

import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.enums.DayOfWeekType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class WeeklyBusinessHoursValidator
    implements ConstraintValidator<
        ValidWeeklyBusinessHours, List<StoreCreateRequestDTO.BusinessHour>> {

  @Override
  public boolean isValid(
      List<StoreCreateRequestDTO.BusinessHour> hours, ConstraintValidatorContext context) {

    // 기본 메시지 비활성화 (커스텀 메시지만 사용)
    context.disableDefaultConstraintViolation();

    // 1. null / empty 검증
    if (hours == null || hours.isEmpty()) {
      addViolation(context, "영업시간은 월~일 모두 입력해야 합니다.");
      return false;
    }

    // 2. 요일 중복 제거 + 월~일 모두 존재 검증
    Map<DayOfWeekType, StoreCreateRequestDTO.BusinessHour> map = new EnumMap<>(DayOfWeekType.class);

    for (StoreCreateRequestDTO.BusinessHour hour : hours) {
      DayOfWeekType day = hour.dayOfWeek();

      if (map.containsKey(day)) {
        addViolation(context, "요일별 영업시간은 중복될 수 없습니다.");
        return false;
      }

      map.put(day, hour);
    }

    if (map.size() != DayOfWeekType.values().length) {
      addViolation(context, "영업시간은 월~일 모두 입력해야 합니다.");
      return false;
    }

    // 3. 각 요일 단위 검증
    for (StoreCreateRequestDTO.BusinessHour hour : map.values()) {
      boolean closed = hour.closed();
      String open = hour.openTime();
      String close = hour.closeTime();

      if (closed) {
        continue;
      }

      // 3-1. 영업일이면 open / close 필수
      if (isBlank(open) || isBlank(close)) {
        addViolation(context, hour.dayOfWeek() + "의 영업 시작/마감 시간을 입력해주세요.");
        return false;
      }

      int openMinutes = toMinutes(open);
      int closeMinutes = toMinutes(close);

      // 3-2. 시작/마감 동일 불가
      if (openMinutes == closeMinutes) {
        addViolation(context, hour.dayOfWeek() + "의 영업 시작 시간과 마감 시간은 같을 수 없습니다.");
        return false;
      }

      // 3-3. 시작 시간이 마감 시간보다 늦을 수 없음
      if (openMinutes > closeMinutes) {
        addViolation(context, hour.dayOfWeek() + "의 영업 시작 시간은 마감 시간보다 늦을 수 없습니다.");
        return false;
      }
    }

    // 4. 연속 요일 영업시간 겹침 검증 (자정 이후 포함)
    for (DayOfWeekType day : DayOfWeekType.values()) {
      StoreCreateRequestDTO.BusinessHour today = map.get(day);
      StoreCreateRequestDTO.BusinessHour next = map.get(day.next());

      if (today.closed() || next.closed()) {
        continue;
      }

      int todayClose = toMinutes(today.closeTime());
      int nextOpen = toMinutes(next.openTime());

      if (todayClose >= nextOpen) {
        addViolation(
            context, day + "과 " + day.next() + "의 영업시간이 겹칩니다. 다음 요일의 시작 시간은 이전 요일 마감 이후여야 합니다.");
        return false;
      }
    }

    return true;
  }

  // ---------- util ----------

  private boolean isBlank(String s) {
    return s == null || s.trim().isEmpty();
  }

  /** 검증 실패 시 사용자에게 보여줄 에러 메시지 추가 */
  private void addViolation(ConstraintValidatorContext context, String message) {
    context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
  }

  /** HH:mm → 분 단위 24:00 → 1440 */
  private int toMinutes(String time) {
    if ("24:00".equals(time)) {
      return 24 * 60;
    }
    String[] t = time.split(":");
    return Integer.parseInt(t[0]) * 60 + Integer.parseInt(t[1]);
  }
}
