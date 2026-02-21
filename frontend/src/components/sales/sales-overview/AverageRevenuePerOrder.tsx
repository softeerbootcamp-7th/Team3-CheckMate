import { useAveragePrice } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const AverageRevenuePerOrder = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { averageOrderAmount, differenceAmount } = useAveragePrice({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesComparison
      title="건당 평균가"
      unit="원"
      differenceAmount={differenceAmount}
      currentValue={averageOrderAmount}
    />
  );
};
