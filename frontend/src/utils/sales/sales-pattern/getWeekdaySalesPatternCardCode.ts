import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getWeekdaySalesPatternCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recent4W>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recent4W.recent4Weeks:
      return SALES_METRIC.SALES_PATTERN.WEEKDAY_SALES_PATTERN.cardCodes
        .recent4Weeks;

    default:
      return SALES_METRIC.SALES_PATTERN.WEEKDAY_SALES_PATTERN.cardCodes
        .recent4Weeks;
  }
};
