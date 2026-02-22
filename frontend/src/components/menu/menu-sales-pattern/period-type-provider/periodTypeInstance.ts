import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: MenuSalesPatternPeriodTypeProvider,
  usePeriodTypeContext: useMenuSalesPatternPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.today7_30>({
  periodPreset: PERIOD_PRESET_KEYS.today7_30,
});
