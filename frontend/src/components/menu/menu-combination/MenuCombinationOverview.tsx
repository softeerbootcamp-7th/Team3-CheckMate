import { useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { usePeriodChangeRefreshTrigger } from '@/hooks/shared';
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

  // 기간 변경과 섹션헤더의 새로고침 시간 업데이트를 연결시켜주는 휵
  const { triggerUpdateRefreshDate, handlePeriodChange } =
    usePeriodChangeRefreshTrigger<typeof periodType>({
      setPeriodType,
    });

  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 조합 분석">
      <SectionHeader
        title="인기 메뉴 조합"
        description="손님들이 자주 함께 고르는 메뉴 조합을 확인해요."
        prefixKey={menuKeys.menuCombination()}
        triggerUpdateRefreshDate={triggerUpdateRefreshDate}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.recent7_14}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handlePeriodChange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />

      <MenuCombinationRankCard />
    </section>
  );
};
