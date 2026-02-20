import { PeriodSelect, SectionHeader } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { usePeriodChangeRefreshTrigger } from '@/hooks/shared';
import { salesKeys } from '@/services/sales';

import { usePeriodTypeContext } from './period-type-provider';

export const SalesOverviewHeader = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePeriodTypeContext();

  // 기간 변경과 섹션헤더의 새로고침 시간 업데이트를 연결시켜주는 휵
  const { triggerUpdateRefreshDate, handlePeriodChange } =
    usePeriodChangeRefreshTrigger<typeof periodType>({
      setPeriodType,
    });
  return (
    <SectionHeader
      title="매출 현황"
      description="실제 매출과 주문 상황을 한눈에 확인해요."
      prefixKey={salesKeys.overview()}
      triggerUpdateRefreshDate={triggerUpdateRefreshDate}
      rightSlot={
        <PeriodSelect
          periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
          periodType={periodType}
          startDate={startDate}
          endDate={endDate}
          setPeriodType={handlePeriodChange}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      }
    />
  );
};
