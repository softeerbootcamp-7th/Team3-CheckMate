import { SectionHeader } from '@/components/shared';
import { salesKeys } from '@/services/sales';

import { PeakTimeByHour } from './PeakTimeByHour';
import { PeakTimeByHourPeriodTypeProvider } from './period-type-provider';
import { RevenueByWeekday } from './RevenueByWeekday';
import { SalesPatternsFetchBoundary } from './SalesPatternsFetchBoundary';

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
        <RevenueByWeekday />
      </section>
    </section>
  );
};
