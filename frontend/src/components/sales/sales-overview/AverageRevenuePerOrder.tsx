import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';

import { SalesComparison } from './shared';

interface AverageRevenuePerOrderProps {
  periodType: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
  startDate?: Date;
  endDate?: Date;
}

export const AverageRevenuePerOrder = ({
  periodType,
}: AverageRevenuePerOrderProps) => {
  const mockedLastAverageRevenuePerOrder = periodType ? 11000 : undefined;
  const mockedCurrentAverageRevenuePerOrder = 12300;

  return (
    <SalesComparison
      periodType={periodType}
      title="건당 평균가"
      unit="원"
      lastValue={mockedLastAverageRevenuePerOrder}
      currentValue={mockedCurrentAverageRevenuePerOrder}
    />
  );
};
