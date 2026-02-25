import {
  DefaultCardFetchBoundary,
  PeriodSelect,
  SectionHeader,
} from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

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

  return (
    <section aria-label="식재료 소진량" className="flex flex-col gap-5">
      <SectionHeader
        title="식재료 소진량"
        description="식재료가 얼마나 소진됐는지 확인해요."
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.todayOnly}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={setPeriodType}
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
