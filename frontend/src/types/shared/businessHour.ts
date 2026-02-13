import type { DayOfWeek } from './dayOfWeek';

export interface BusinessHour {
  dayOfWeek: DayOfWeek;
  openTime?: string; // 00:00 ~ 23:30
  closeTime?: string; // 00:00 ~ 23:30
  is24?: boolean;
  closed?: boolean;
  // client에만 있는 상태, 마감 시간이 다음날 00:00 이후인 경우 체크
  isOver24?: boolean;
}
