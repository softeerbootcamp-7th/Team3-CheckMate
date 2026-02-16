import { useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

import { IngredientConsumptionRankCard } from './IngredientConsumptionRankCard';

type IngredientConsumptionPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.todayOnly>
  | undefined;

export const IngredientConsumptionOverview = () => {
  const [periodType, setPeriodType] =
    useState<IngredientConsumptionPeriodPresetType>(
      PERIOD_PRESETS.todayOnly.today,
    );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <section aria-label="식재료 소진량" className="flex flex-col gap-5">
      <SectionHeader
        title="식재료 소진량"
        description="식재료가 얼마나 소진됐는지 확인해요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
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
      <IngredientConsumptionRankCard />
    </section>
  );
};
