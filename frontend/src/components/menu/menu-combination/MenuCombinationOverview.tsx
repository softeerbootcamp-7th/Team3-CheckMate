import { useState } from 'react';

import { SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

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
  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 조합 분석">
      <SectionHeader
        title="인기 메뉴 조합"
        description="손님들이 자주 함께 고르는 메뉴 조합을 확인해요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
        periodSelectProps={{
          periodPreset: PERIOD_PRESET_KEYS.recent7_14,
          periodType,
          startDate,
          endDate,
          setPeriodType,
          setStartDate,
          setEndDate,
        }}
      />

      <MenuCombinationRankCard />
    </section>
  );
};
