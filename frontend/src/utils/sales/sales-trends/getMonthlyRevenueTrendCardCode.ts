import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getMonthlyRevenueTrendCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentMonths6_12>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recentMonths6_12.recent6Months:
      return SALES_METRIC.SALES_TREND.MONTHLY_SALES_TREND.cardCodes
        .recent6Months;
    case PERIOD_PRESETS.recentMonths6_12.recent12Months:
      return SALES_METRIC.SALES_TREND.MONTHLY_SALES_TREND.cardCodes
        .recent12Months;
    default:
      return SALES_METRIC.SALES_TREND.MONTHLY_SALES_TREND.cardCodes
        .recent6Months;
  }
};
