import { DAY_OF_WEEK_LIST, PERIOD_PRESETS } from '@/constants/shared';
import type { ValueOf } from '@/utils/shared';

export const getPeriodComparisonMessage = (
  type: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>,
) => {
  const weekday = DAY_OF_WEEK_LIST[new Date().getDay()];

  switch (type) {
    case PERIOD_PRESETS.dayWeekMonth.today:
      return `지난주 ${weekday}요일 이 시간보다`;
    case PERIOD_PRESETS.dayWeekMonth.thisWeek:
      return '지난주 이맘때보다';
    case PERIOD_PRESETS.dayWeekMonth.thisMonth:
      return '지난달 이맘때보다';
  }
};
