import { MENU_METRIC } from '@/constants/menu';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getMenuSalesPatternCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.today7_30.today:
      return MENU_METRIC.MENU_SALES_PATTERN.TIME_BASED_MENU_ORDER_COUNT
        .cardCodes.today;
    case PERIOD_PRESETS.today7_30.recent7Days:
      return MENU_METRIC.MENU_SALES_PATTERN.TIME_BASED_MENU_ORDER_COUNT
        .cardCodes.recent7Days;
    case PERIOD_PRESETS.today7_30.recent30Days:
      return MENU_METRIC.MENU_SALES_PATTERN.TIME_BASED_MENU_ORDER_COUNT
        .cardCodes.recent30Days;
    default:
      return MENU_METRIC.MENU_SALES_PATTERN.TIME_BASED_MENU_ORDER_COUNT
        .cardCodes.today;
  }
};
