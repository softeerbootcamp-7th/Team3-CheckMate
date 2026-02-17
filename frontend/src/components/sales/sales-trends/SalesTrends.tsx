import { SectionHeader } from '@/components/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { salesKeys } from '@/services/sales';

import { DailyRevenueTrend } from './DailyRevenueTrend';
import { MonthlyRevenueTrend } from './MonthlyRevenueTrend';
import { WeeklyRevenueTrend } from './WeeklyRevenueTrend';
import { YearlyRevenueTrend } from './YearlyRevenueTrend';

export const SalesTrends = () => {
  const { lastUpdatedDate, isFetching, refresh } = useSectionRefresh({
    prefixKey: salesKeys.trends(), // 메출>매출추이 섹션에 해당되는 공통 쿼리 키는 ["sales", "trends"]
    initLastUpdatedNow: true, // 최초 진입 시 현재 시각 표시 여부 선택
  });
  return (
    <section aria-label="매출 추이">
      <SectionHeader
        title="매출 추이"
        description="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        lastUpdatedDate={lastUpdatedDate}
        onRefresh={refresh}
        isLoading={isFetching}
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
