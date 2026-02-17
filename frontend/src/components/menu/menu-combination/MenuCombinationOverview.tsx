import { useCallback, useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

import { MenuCombinationRankCard } from './MenuCombinationRankCard';

type MenuCombinationPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.recent7_14>
  | undefined;

export const MenuCombinationOverview = () => {
  const [periodType, setPeriodType] = useState<MenuCombinationPeriodPresetType>(
    PERIOD_PRESETS.recent7_14.recent7Days,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey: menuKeys.menuCombination(), // 메뉴>인기 메뉴 조합 섹션에 해당되는 공통 쿼리 키는 ["menu", "menu-combination"]
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
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 조합 분석">
      <SectionHeader
        title="인기 메뉴 조합"
        description="손님들이 자주 함께 고르는 메뉴 조합을 확인해요."
        lastUpdatedDate={lastUpdatedDate}
        onRefresh={refresh}
        isLoading={isFetching}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.recent7_14}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handleSetPeriodType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />

      <MenuCombinationRankCard />
    </section>
  );
};
