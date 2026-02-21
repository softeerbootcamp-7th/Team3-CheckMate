import { SectionHeader } from '@/components/shared';
import { salesKeys } from '@/services/sales';

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
  return (
    <section aria-label="매출 추이">
      <SectionHeader
        title="매출 추이"
        description="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        prefixKey={salesKeys.trends()}
      />
      <section className="mt-4 grid grid-rows-3 gap-5">
        <RevenueTrendFetchBoundary>
          <DailyRevenueTrendPeriodTypeProvider>
            <DailyRevenueTrend />
          </DailyRevenueTrendPeriodTypeProvider>
        </RevenueTrendFetchBoundary>
        <RevenueTrendFetchBoundary>
          <WeeklyRevenueTrendPeriodTypeProvider>
            <WeeklyRevenueTrend />
          </WeeklyRevenueTrendPeriodTypeProvider>
        </RevenueTrendFetchBoundary>
        <div className="flex gap-5">
          <RevenueTrendFetchBoundary className="w-175">
            <MonthlyRevenueTrendPeriodTypeProvider>
              <MonthlyRevenueTrend />
            </MonthlyRevenueTrendPeriodTypeProvider>
          </RevenueTrendFetchBoundary>
          <RevenueTrendFetchBoundary cardWidth={340}>
            <YearlyRevenueTrendPeriodTypeProvider>
              <YearlyRevenueTrend />
            </YearlyRevenueTrendPeriodTypeProvider>
          </RevenueTrendFetchBoundary>
        </div>
      </section>
    </section>
  );
};
