import { MENU_METRIC } from '@/constants/menu';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getMenuSalesRankCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.today7_30.today:
      return MENU_METRIC.POPULAR_MENU.MENU_SALES_RANKING.cardCodes.today;
    case PERIOD_PRESETS.today7_30.recent7Days:
      return MENU_METRIC.POPULAR_MENU.MENU_SALES_RANKING.cardCodes.recent7Days;
    case PERIOD_PRESETS.today7_30.recent30Days:
      return MENU_METRIC.POPULAR_MENU.MENU_SALES_RANKING.cardCodes.recent30Days;
    default:
      return MENU_METRIC.POPULAR_MENU.MENU_SALES_RANKING.cardCodes.today;
  }
};
