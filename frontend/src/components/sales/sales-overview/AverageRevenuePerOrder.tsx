import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const AverageRevenuePerOrder = () => {
  const { periodType } = usePeriodTypeContext();

  const mockedLastAverageRevenuePerOrder = periodType ? 11000 : undefined;
  const mockedCurrentAverageRevenuePerOrder = 12300;

  return (
    <SalesComparison
      title="건당 평균가"
      unit="원"
      lastValue={mockedLastAverageRevenuePerOrder}
      currentValue={mockedCurrentAverageRevenuePerOrder}
    />
  );
};
