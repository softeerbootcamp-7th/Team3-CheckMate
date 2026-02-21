import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { createPeriodTypeProvider } from '@/utils/shared';

export const {
  PeriodTypeProvider: DailyRevenueTrendPeriodTypeProvider,
  usePeriodTypeContext: useDailyRevenueTrendPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recentDays7_14_30>({
  periodPreset: PERIOD_PRESET_KEYS.recentDays7_14_30,
});

export const {
  PeriodTypeProvider: WeeklyRevenueTrendPeriodTypeProvider,
  usePeriodTypeContext: useWeeklyRevenueTrendPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recentWeeks8_12>({
  periodPreset: PERIOD_PRESET_KEYS.recentWeeks8_12,
});

export const {
  PeriodTypeProvider: MonthlyRevenueTrendPeriodTypeProvider,
  usePeriodTypeContext: useMonthlyRevenueTrendPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recentMonths6_12>({
  periodPreset: PERIOD_PRESET_KEYS.recentMonths6_12,
});

export const {
  PeriodTypeProvider: YearlyRevenueTrendPeriodTypeProvider,
  usePeriodTypeContext: useYearlyRevenueTrendPeriodType,
} = createPeriodTypeProvider<typeof PERIOD_PRESET_KEYS.recentYears3>({
  periodPreset: PERIOD_PRESET_KEYS.recentYears3,
});
