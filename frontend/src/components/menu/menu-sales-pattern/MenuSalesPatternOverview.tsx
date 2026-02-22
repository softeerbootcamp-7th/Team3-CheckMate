import {
  DefaultCardFetchBoundary,
  PeriodSelect,
  SectionHeader,
} from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { usePeriodChangeRefreshTrigger } from '@/hooks/shared';
import { menuKeys } from '@/services/menu';

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

  // 기간 변경과 섹션헤더의 새로고침 시간 업데이트 연결시켜주는 휵
  const { triggerUpdateRefreshDate, handlePeriodChange } =
    usePeriodChangeRefreshTrigger<typeof periodType>({
      setPeriodType,
    });

  return (
    <section aria-label="메뉴별 판매 패턴" className="flex flex-col gap-5">
      <SectionHeader
        title="메뉴 판매 패턴"
        description="시간대별로 어떤 메뉴가 잘 팔리는지 흐름을 살펴봐요."
        prefixKey={menuKeys.menuSalesPattern()}
        triggerUpdateRefreshDate={triggerUpdateRefreshDate}
        rightSlot={
          <PeriodSelect
            periodPreset={PERIOD_PRESET_KEYS.today7_30}
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
            setPeriodType={handlePeriodChange}
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
