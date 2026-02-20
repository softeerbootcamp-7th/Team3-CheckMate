import {
  DefaultCardFetchBoundary,
  PeriodSelect,
  SectionHeader,
} from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { usePeriodChangeRefreshTrigger } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

import { IngredientConsumptionRankCard } from './IngredientConsumptionRankCard';
import { useIngredientConsumptionPeriodType } from './period-type-provider';

export const IngredientConsumptionOverview = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useIngredientConsumptionPeriodType();

  // 기간 변경과 섹션헤더의 새로고침 시간 업데이트를 연결시켜주는 휵
  const { triggerUpdateRefreshDate, handlePeriodChange } =
    usePeriodChangeRefreshTrigger<typeof periodType>({
      setPeriodType,
    });

  return (
    <section aria-label="식재료 소진량" className="flex flex-col gap-5">
      <SectionHeader
        title="식재료 소진량"
        description="식재료가 얼마나 소진됐는지 확인해요."
        prefixKey={menuKeys.ingredientConsumption()}
        triggerUpdateRefreshDate={triggerUpdateRefreshDate}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.todayOnly}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handlePeriodChange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />
      <DefaultCardFetchBoundary className="h-95.5 w-full">
        <IngredientConsumptionRankCard />
      </DefaultCardFetchBoundary>
    </section>
  );
};
