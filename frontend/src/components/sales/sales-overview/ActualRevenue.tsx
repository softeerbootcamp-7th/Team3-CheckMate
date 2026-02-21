import { useRealSales } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const ActualRevenue = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { netAmount, differenceAmount } = useRealSales({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesComparison
      title="실매출"
      unit="원"
      differenceAmount={differenceAmount}
      currentValue={netAmount}
    />
  );
};
