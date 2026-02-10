import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const ActualRevenue = () => {
  const { periodType } = usePeriodTypeContext();

  const mockedLastRevenue = periodType ? 200300 : undefined;
  const mockedCurrentRevenue = 295600;

  return (
    <SalesComparison
      title="실매출"
      unit="원"
      lastValue={mockedLastRevenue}
      currentValue={mockedCurrentRevenue}
    />
  );
};
