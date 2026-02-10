import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const { PeriodTypeProvider, usePeriodTypeContext } =
  createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.dayWeekMonth>({
    periodPreset: PERIOD_PRESET_KEYS.dayWeekMonth,
  });
