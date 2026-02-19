import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getDiscountAndCancellationCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.dayWeekMonth.today:
      return SALES_METRIC.CURRENT_SALES.DISCOUNT_AND_CANCELLATION.cardCodes
        .today;
    case PERIOD_PRESETS.dayWeekMonth.thisWeek:
      return SALES_METRIC.CURRENT_SALES.DISCOUNT_AND_CANCELLATION.cardCodes
        .thisWeek;
    case PERIOD_PRESETS.dayWeekMonth.thisMonth:
      return SALES_METRIC.CURRENT_SALES.DISCOUNT_AND_CANCELLATION.cardCodes
        .thisMonth;
    default:
      return SALES_METRIC.CURRENT_SALES.DISCOUNT_AND_CANCELLATION.cardCodes
        .today;
  }
};
