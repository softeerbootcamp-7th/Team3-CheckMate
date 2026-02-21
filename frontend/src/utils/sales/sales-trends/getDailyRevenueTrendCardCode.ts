import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getDailyRevenueTrendCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentDays7_14_30>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recentDays7_14_30.recent7Days:
      return SALES_METRIC.SALES_TREND.DAILY_SALES_TREND.cardCodes.recent7Days;
    case PERIOD_PRESETS.recentDays7_14_30.recent14Days:
      return SALES_METRIC.SALES_TREND.DAILY_SALES_TREND.cardCodes.recent14Days;
    case PERIOD_PRESETS.recentDays7_14_30.recent30Days:
      return SALES_METRIC.SALES_TREND.DAILY_SALES_TREND.cardCodes.recent30Days;
    default:
      return SALES_METRIC.SALES_TREND.DAILY_SALES_TREND.cardCodes.recent7Days;
  }
};
