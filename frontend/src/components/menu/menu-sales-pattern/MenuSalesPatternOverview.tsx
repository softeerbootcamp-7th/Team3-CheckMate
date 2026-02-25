import {
  DefaultCardFetchBoundary,
  PeriodSelect,
  SectionHeader,
} from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { useMenuSalesPatternPeriodType } from './period-type-provider';
import { TimeSlotMenuOrderCount } from './TimeSlotMenuOrderCount';

export const MenuSalesPatternOverview = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useMenuSalesPatternPeriodType();

  return (
    <section aria-label="메뉴별 판매 패턴" className="flex flex-col gap-5">
      <SectionHeader
        title="메뉴 판매 패턴"
        description="시간대별로 어떤 메뉴가 잘 팔리는지 흐름을 살펴봐요."
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.today7_30}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={setPeriodType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
      />
      <DefaultCardFetchBoundary className="h-87 w-full">
        <TimeSlotMenuOrderCount />
      </DefaultCardFetchBoundary>
    </section>
  );
};
