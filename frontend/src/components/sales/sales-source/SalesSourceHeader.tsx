import { PeriodSelect, SectionHeader } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { usePeriodChangeRefreshTrigger } from '@/hooks/shared';
import { salesKeys } from '@/services/sales';

import { usePeriodTypeContext } from './period-type-provider';

export const SalesSourceHeader = () => {
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
      title="매출 유입 구조"
      description="매출이 어떤 경로와 방식으로 들어왔는지 확인해요."
      prefixKey={salesKeys.source()}
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
