import {
  PERIOD_PRESET_KEYS,
  type PeriodType,
} from '@/constants/shared/periods';

import { SalesComparison } from './shared';

interface OrderCountProps {
  periodType: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
  startDate?: Date;
  endDate?: Date;
}

export const OrderCount = ({ periodType }: OrderCountProps) => {
  const mockedLastOrderCount = periodType ? 23 : undefined;
  const mockedCurrentOrderCount = 42;

  return (
    <SalesComparison
      periodType={periodType}
      title="주문건수"
      unit="건"
      lastValue={mockedLastOrderCount}
      currentValue={mockedCurrentOrderCount}
    />
  );
};
