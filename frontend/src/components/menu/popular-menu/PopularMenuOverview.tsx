import { useCallback, useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

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
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey: menuKeys.popularMenu(), // 메뉴>인기 메뉴 섹션에 해당되는 공통 쿼리 키는 ["menu", "popular-menu"]
      initLastUpdatedNow: true, // 최초 진입 시 현재 시각 표시 여부 선택
    });
  // 기간 선택 변경했을 때 섹션 헤더의 마지막 업데이트 날짜를 현재 시각으로 업데이트하는 함수
  const handleSetPeriodType = useCallback(
    (selectedPeriodType: typeof periodType) => {
      updateLastUpdatedDateToNow();
      setPeriodType(selectedPeriodType);
    },
    [setPeriodType, updateLastUpdatedDateToNow],
  );
  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 분석">
      <SectionHeader
        title="인기 메뉴"
        description="잘 팔리는 메뉴와 카테고리별 매출 구성을 한눈에 확인해요."
        lastUpdatedDate={lastUpdatedDate}
        onRefresh={refresh}
        isLoading={isFetching}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.today7_30}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handleSetPeriodType}
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
