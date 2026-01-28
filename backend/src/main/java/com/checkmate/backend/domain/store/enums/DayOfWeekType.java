package com.checkmate.backend.domain.store.enums;

import lombok.Getter;

@Getter
public enum DayOfWeekType {
  MON("월"),
  TUE("화"),
  WED("수"),
  THU("목"),
  FRI("금"),
  SAT("토"),
  SUN("일");

  private final String korean;

  DayOfWeekType(String korean) {
    this.korean = korean;
  }

  /** 현재 요일 -> 다음 요일 반환 */
  public DayOfWeekType next() {
    return values()[(this.ordinal() + 1) % values().length];
  }
}
