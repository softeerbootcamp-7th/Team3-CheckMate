import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: IngredientConsumptionPeriodTypeProvider,
  usePeriodTypeContext: useIngredientConsumptionPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.todayOnly>({
  periodPreset: PERIOD_PRESET_KEYS.todayOnly,
});
