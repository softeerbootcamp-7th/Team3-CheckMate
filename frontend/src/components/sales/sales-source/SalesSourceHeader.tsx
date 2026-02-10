import { PeriodSelect, SectionTitle } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';

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

  return (
    <header className="flex justify-between">
      <SectionTitle
        title="매출 유입 구조"
        description="매출이 어떤 경로와 방식으로 들어왔는지 확인해요."
      />
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </header>
  );
};
