import { SectionHeader } from '@/components/shared';
import { SALES_PERIOD_LOCAL_STORAGE_KEY } from '@/constants/sales';

import { DailyRevenueTrend } from './DailyRevenueTrend';
import { MonthlyRevenueTrend } from './MonthlyRevenueTrend';
import {
  DailyRevenueTrendPeriodTypeProvider,
  MonthlyRevenueTrendPeriodTypeProvider,
  WeeklyRevenueTrendPeriodTypeProvider,
  YearlyRevenueTrendPeriodTypeProvider,
} from './period-type-provider';
import { RevenueTrendFetchBoundary } from './RevenueTrendFetchBoundary';
import { WeeklyRevenueTrend } from './WeeklyRevenueTrend';
import { YearlyRevenueTrend } from './YearlyRevenueTrend';

export const SalesTrends = () => {
  const {
    salesTrendsDaily,
    salesTrendsWeekly,
    salesTrendsMonthly,
    salesTrendsYearly,
  } = SALES_PERIOD_LOCAL_STORAGE_KEY;
  return (
    <section aria-label="매출 추이">
      <SectionHeader
        title="매출 추이"
        description="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
      />
      <section className="mt-4 grid grid-rows-3 gap-5">
        <RevenueTrendFetchBoundary>
          <DailyRevenueTrendPeriodTypeProvider periodKey={salesTrendsDaily}>
            <DailyRevenueTrend />
          </DailyRevenueTrendPeriodTypeProvider>
        </RevenueTrendFetchBoundary>
        <RevenueTrendFetchBoundary>
          <WeeklyRevenueTrendPeriodTypeProvider periodKey={salesTrendsWeekly}>
            <WeeklyRevenueTrend />
          </WeeklyRevenueTrendPeriodTypeProvider>
        </RevenueTrendFetchBoundary>
        <div className="flex gap-5">
          <RevenueTrendFetchBoundary className="w-180">
            <MonthlyRevenueTrendPeriodTypeProvider
              periodKey={salesTrendsMonthly}
            >
              <MonthlyRevenueTrend />
            </MonthlyRevenueTrendPeriodTypeProvider>
          </RevenueTrendFetchBoundary>
          <RevenueTrendFetchBoundary className="w-85">
            <YearlyRevenueTrendPeriodTypeProvider periodKey={salesTrendsYearly}>
              <YearlyRevenueTrend />
            </YearlyRevenueTrendPeriodTypeProvider>
          </RevenueTrendFetchBoundary>
        </div>
      </section>
    </section>
  );
};
