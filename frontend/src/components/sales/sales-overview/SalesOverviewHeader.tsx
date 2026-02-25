import { PeriodSelect, SectionHeader } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

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

  return (
    <SectionHeader
      title="매출 현황"
      description="실제 매출과 주문 상황을 한눈에 확인해요."
      rightSlot={
        <PeriodSelect
          periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
          periodType={periodType}
          startDate={startDate}
          endDate={endDate}
          setPeriodType={setPeriodType}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      }
    />
  );
};
