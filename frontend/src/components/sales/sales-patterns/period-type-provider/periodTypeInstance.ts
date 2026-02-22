import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: PeakTimeByHourPeriodTypeProvider,
  usePeriodTypeContext: usePeakTimeByHourPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.todayOnly>({
  periodPreset: PERIOD_PRESET_KEYS.todayOnly,
});

export const {
  PeriodTypeProvider: WeekdaySalesPatternPeriodTypeProvider,
  usePeriodTypeContext: useWeekdaySalesPatternPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recent4W>({
  periodPreset: PERIOD_PRESET_KEYS.recent4W,
});
