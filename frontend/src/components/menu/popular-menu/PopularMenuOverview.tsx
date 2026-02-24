import { PeriodSelect, SectionHeader } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { CategorySalesCard } from './CategorySalesCard';
import { MenuSalesRankCard } from './MenuSalesRankCard';
import { usePopularMenuPeriodType } from './period-type-provider';

export const PopularMenuOverview = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePopularMenuPeriodType();

  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 분석">
      <SectionHeader
        title="인기 메뉴"
        description="잘 팔리는 메뉴와 카테고리별 매출 구성을 한눈에 확인해요."
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.today7_30}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={setPeriodType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />

      <div className="flex gap-5">
        <MenuSalesRankCard />
        <CategorySalesCard />
      </div>
    </section>
  );
};
