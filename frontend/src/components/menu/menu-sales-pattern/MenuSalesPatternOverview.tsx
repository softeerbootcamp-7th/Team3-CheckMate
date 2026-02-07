import { useState } from 'react';

import { PeriodSelect, SectionTitle } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

import { HourlyOrderPatternCard } from './HourlyOrderPatternCard';

type MenuSalesPatternPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>
  | undefined;

export const MenuSalesPatternOverview = () => {
  const [periodType, setPeriodType] =
    useState<MenuSalesPatternPeriodPresetType>(PERIOD_PRESETS.today7_30.today);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <section aria-label="메뉴별 판매 패턴" className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SectionTitle
          title="메뉴 판매 패턴"
          description="시간대별로 어떤 메뉴가 잘 팔리는지 흐름을 살펴봐요."
        />
        <PeriodSelect
          periodPreset={PERIOD_PRESET_KEYS.today7_30}
          periodType={periodType}
          setPeriodType={setPeriodType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
      <HourlyOrderPatternCard />
    </section>
  );
};
