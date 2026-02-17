import { useCallback, useState } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

import { HourlyOrderPatternCard } from './HourlyOrderPatternCard';

type MenuSalesPatternPeriodPresetType =
  | PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>
  | undefined;

export const MenuSalesPatternOverview = () => {
  const [periodType, setPeriodType] =
    useState<MenuSalesPatternPeriodPresetType>(PERIOD_PRESETS.today7_30.today);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey: menuKeys.menuSalesPattern(), // 메뉴>메뉴별 판매 패턴 섹션에 해당되는 공통 쿼리 키는 ["menu", "menu-sales-pattern"]
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
    <section aria-label="메뉴별 판매 패턴" className="flex flex-col gap-5">
      <SectionHeader
        title="메뉴 판매 패턴"
        description="시간대별로 어떤 메뉴가 잘 팔리는지 흐름을 살펴봐요."
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
      <HourlyOrderPatternCard />
    </section>
  );
};
