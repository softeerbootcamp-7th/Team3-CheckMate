import { SectionHeader } from '@/components/shared';
import { SALES_PERIOD_LOCAL_STORAGE_KEY } from '@/constants/sales';

import { PeakTimeByHour } from './PeakTimeByHour';
import {
  PeakTimeByHourPeriodTypeProvider,
  WeekdaySalesPatternPeriodTypeProvider,
} from './period-type-provider';
import { SalesPatternsFetchBoundary } from './SalesPatternsFetchBoundary';
import { WeekdaySalesPattern } from './WeekdaySalesPattern';

export const SalesPatterns = () => {
  const { salesPatternsPeakTimeByHour, salesPatternsWeekdaySalesPattern } =
    SALES_PERIOD_LOCAL_STORAGE_KEY;
  return (
    <section aria-label="매출 패턴">
      <SectionHeader
        title="매출 패턴"
        description="매장이 바쁜 때를 파악해요."
      />

      <section className="mt-4 grid grid-rows-2 gap-4">
        <SalesPatternsFetchBoundary>
          <PeakTimeByHourPeriodTypeProvider
            periodKey={salesPatternsPeakTimeByHour}
          >
            <PeakTimeByHour />
          </PeakTimeByHourPeriodTypeProvider>
        </SalesPatternsFetchBoundary>
        <SalesPatternsFetchBoundary>
          <WeekdaySalesPatternPeriodTypeProvider
            periodKey={salesPatternsWeekdaySalesPattern}
          >
            <WeekdaySalesPattern />
          </WeekdaySalesPatternPeriodTypeProvider>
        </SalesPatternsFetchBoundary>
      </section>
    </section>
  );
};
