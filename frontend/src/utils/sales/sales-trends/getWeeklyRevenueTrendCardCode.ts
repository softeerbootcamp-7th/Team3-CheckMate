import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getWeeklyRevenueTrendCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentWeeks8_12>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recentWeeks8_12.recent8Weeks:
      return SALES_METRIC.SALES_TREND.WEEKLY_SALES_TREND.cardCodes.recent8Weeks;
    case PERIOD_PRESETS.recentWeeks8_12.recent12Weeks:
      return SALES_METRIC.SALES_TREND.WEEKLY_SALES_TREND.cardCodes
        .recent12Weeks;
    default:
      return SALES_METRIC.SALES_TREND.WEEKLY_SALES_TREND.cardCodes.recent8Weeks;
  }
};
