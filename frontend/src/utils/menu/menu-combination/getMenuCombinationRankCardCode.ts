import { MENU_METRIC } from '@/constants/menu';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

export const getMenuCombinationRankCardCode = (
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recent7_14>,
) => {
  switch (periodType) {
    case PERIOD_PRESETS.recent7_14.recent7Days:
      return MENU_METRIC.POPULAR_MENU_COMBINATION.POPULAR_MENU_COMBINATION
        .cardCodes.recent7Days;
    case PERIOD_PRESETS.recent7_14.recent14Days:
      return MENU_METRIC.POPULAR_MENU_COMBINATION.POPULAR_MENU_COMBINATION
        .cardCodes.recent14Days;
    default:
      return MENU_METRIC.POPULAR_MENU_COMBINATION.POPULAR_MENU_COMBINATION
        .cardCodes.recent7Days;
  }
};
