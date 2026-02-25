import {
  DefaultCardFetchBoundary,
  PeriodSelect,
  SectionHeader,
} from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { MenuCombinationRankCard } from './MenuCombinationRankCard';
import { useMenuCombinationPeriodType } from './period-type-provider';

export const MenuCombinationOverview = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useMenuCombinationPeriodType();

  // 기간 변경과 섹션헤더의 새로고침 시간 업데이트를 연결시켜주는 훅

  return (
    <section className="flex flex-col gap-4" aria-label="인기 메뉴 조합 분석">
      <SectionHeader
        title="인기 메뉴 조합"
        description="손님들이 자주 함께 고르는 메뉴 조합을 확인해요."
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.recent7_14}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={setPeriodType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />
      <DefaultCardFetchBoundary className="h-108 w-full">
        <MenuCombinationRankCard />
      </DefaultCardFetchBoundary>
    </section>
  );
};
