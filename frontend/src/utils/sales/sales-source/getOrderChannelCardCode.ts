import { SALES_METRIC } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getOrderChannelCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.dayWeekMonth.today:
      return SALES_METRIC.SALES_SOURCE.ORDER_CHANNEL.cardCodes.today;
    case PERIOD_PRESETS.dayWeekMonth.thisWeek:
      return SALES_METRIC.SALES_SOURCE.ORDER_CHANNEL.cardCodes.thisWeek;
    case PERIOD_PRESETS.dayWeekMonth.thisMonth:
      return SALES_METRIC.SALES_SOURCE.ORDER_CHANNEL.cardCodes.thisMonth;
    default:
      return SALES_METRIC.SALES_SOURCE.ORDER_CHANNEL.cardCodes.today;
  }
};
