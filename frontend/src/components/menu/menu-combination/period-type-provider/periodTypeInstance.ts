import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: MenuCombinationPeriodTypeProvider,
  usePeriodTypeContext: useMenuCombinationPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recent7_14>({
  periodPreset: PERIOD_PRESET_KEYS.recent7_14,
});
