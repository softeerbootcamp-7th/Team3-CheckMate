import { useOrderCount } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesComparison } from './shared';

export const OrderCount = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { orderCount, differenceOrderCount, queryKey } = useOrderCount({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesComparison
      title="주문건수"
      unit="건"
      differenceAmount={differenceOrderCount}
      currentValue={orderCount}
      queryKey={queryKey}
    />
  );
};
