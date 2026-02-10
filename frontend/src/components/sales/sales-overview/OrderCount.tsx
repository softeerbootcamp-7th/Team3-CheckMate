import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const OrderCount = () => {
  const { periodType } = usePeriodTypeContext();

  const mockedLastOrderCount = periodType ? 23 : undefined;
  const mockedCurrentOrderCount = 42;

  return (
    <SalesComparison
      title="주문건수"
      unit="건"
      lastValue={mockedLastOrderCount}
      currentValue={mockedCurrentOrderCount}
    />
  );
};
