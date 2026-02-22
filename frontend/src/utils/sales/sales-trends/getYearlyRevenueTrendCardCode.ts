import { SALES_METRIC } from '@/constants/sales';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getYearlyRevenueTrendCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentYears3>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recentYears3.recent3Years:
      return SALES_METRIC.SALES_TREND.YEARLY_SALES_TREND.cardCodes.recent3Years;

    default:
      return SALES_METRIC.SALES_TREND.YEARLY_SALES_TREND.cardCodes.recent3Years;
  }
};
