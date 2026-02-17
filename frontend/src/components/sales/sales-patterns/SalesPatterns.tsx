import { SectionHeader } from '@/components/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { salesKeys } from '@/services/sales';

import { PeakTimeByHour } from './PeakTimeByHour';
import { RevenueByWeekday } from './RevenueByWeekday';

export const SalesPatterns = () => {
  const { lastUpdatedDate, isFetching, refresh } = useSectionRefresh({
    prefixKey: salesKeys.patterns(), // 메출>매출패턴 섹션에 해당되는 공통 쿼리 키는 ["sales", "patterns"]
    initLastUpdatedNow: true, // 최초 진입 시 현재 시각 표시 여부 선택
  });
  return (
    <section aria-label="매출 패턴">
      <SectionHeader
        title="매출 패턴"
        description="매장이 바쁜 때를 파악해요."
        lastUpdatedDate={lastUpdatedDate}
        onRefresh={refresh}
        isLoading={isFetching}
      />

      <section className="mt-4 grid grid-rows-2 gap-4">
        <PeakTimeByHour />
        <RevenueByWeekday />
      </section>
    </section>
  );
};
