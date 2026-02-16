import { SectionHeader } from '@/components/shared';

import { DailyRevenueTrend } from './DailyRevenueTrend';
import { MonthlyRevenueTrend } from './MonthlyRevenueTrend';
import { WeeklyRevenueTrend } from './WeeklyRevenueTrend';
import { YearlyRevenueTrend } from './YearlyRevenueTrend';

export const SalesTrends = () => {
  return (
    <section aria-label="매출 추이">
      <SectionHeader
        title="매출 추이"
        description="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
      />
      <section className="mt-4 grid grid-rows-3 gap-5">
        <DailyRevenueTrend />
        <WeeklyRevenueTrend />
        <div className="flex gap-5">
          <MonthlyRevenueTrend />
          <YearlyRevenueTrend />
        </div>
      </section>
    </section>
  );
};
