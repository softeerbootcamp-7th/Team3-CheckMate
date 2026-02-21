import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: PopularMenuPeriodTypeProvider,
  usePeriodTypeContext: usePopularMenuPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.today7_30>({
  periodPreset: PERIOD_PRESET_KEYS.today7_30,
});
