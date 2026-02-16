import { useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

import { CategorySalesCard } from './CategorySalesCard';
import { MenuSalesRankCard } from './MenuSalesRankCard';

type PopularMenuPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>
  | undefined;

export const PopularMenuOverview = () => {
  const [periodType, setPeriodType] = useState<PopularMenuPeriodPresetType>(
    PERIOD_PRESETS.today7_30.today,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 분석">
      <SectionHeader
        title="인기 메뉴"
        description="잘 팔리는 메뉴와 카테고리별 매출 구성을 한눈에 확인해요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
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
