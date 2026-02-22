import { SectionHeader } from '@/components/shared';
import { salesKeys } from '@/services/sales';

import { PeakTimeByHour } from './PeakTimeByHour';
import {
  PeakTimeByHourPeriodTypeProvider,
  WeekdaySalesPatternPeriodTypeProvider,
} from './period-type-provider';
import { SalesPatternsFetchBoundary } from './SalesPatternsFetchBoundary';
import { WeekdaySalesPattern } from './WeekdaySalesPattern';

export const SalesPatterns = () => {
  return (
    <section aria-label="매출 패턴">
      <SectionHeader
        title="매출 패턴"
        description="매장이 바쁜 때를 파악해요."
        prefixKey={salesKeys.patterns()}
      />

      <section className="mt-4 grid grid-rows-2 gap-4">
        <SalesPatternsFetchBoundary>
          <PeakTimeByHourPeriodTypeProvider>
            <PeakTimeByHour />
          </PeakTimeByHourPeriodTypeProvider>
        </SalesPatternsFetchBoundary>
        <SalesPatternsFetchBoundary>
          <WeekdaySalesPatternPeriodTypeProvider>
            <WeekdaySalesPattern />
          </WeekdaySalesPatternPeriodTypeProvider>
        </SalesPatternsFetchBoundary>
      </section>
    </section>
  );
};
