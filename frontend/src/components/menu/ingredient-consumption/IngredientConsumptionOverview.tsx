import { useCallback, useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

import { IngredientConsumptionRankCard } from './IngredientConsumptionRankCard';

type IngredientConsumptionPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.todayOnly>
  | undefined;

export const IngredientConsumptionOverview = () => {
  const [periodType, setPeriodType] =
    useState<IngredientConsumptionPeriodPresetType>(
      PERIOD_PRESETS.todayOnly.today,
    );
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey: menuKeys.ingredientConsumption(), // 메뉴>식재료 소진량 섹션에 해당되는 공통 쿼리 키는 ["menu", "ingredient-consumption"]
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
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <section aria-label="식재료 소진량" className="flex flex-col gap-5">
      <SectionHeader
        title="식재료 소진량"
        description="식재료가 얼마나 소진됐는지 확인해요."
        lastUpdatedDate={lastUpdatedDate}
        onRefresh={refresh}
        isLoading={isFetching}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.todayOnly}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handleSetPeriodType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />
      <IngredientConsumptionRankCard />
    </section>
  );
};
