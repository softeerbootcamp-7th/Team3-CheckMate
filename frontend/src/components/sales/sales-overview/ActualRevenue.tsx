import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';

import { SalesComparison } from './shared';

interface ActualRevenueProps {
  periodType: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
  startDate?: Date;
  endDate?: Date;
}
export const ActualRevenue = ({ periodType }: ActualRevenueProps) => {
  const mockedLastRevenue = periodType ? 200300 : undefined;
  const mockedCurrentRevenue = 295600;

  return (
    <SalesComparison
      periodType={periodType}
      title="실매출"
      unit="원"
      lastValue={mockedLastRevenue}
      currentValue={mockedCurrentRevenue}
    />
  );
};
