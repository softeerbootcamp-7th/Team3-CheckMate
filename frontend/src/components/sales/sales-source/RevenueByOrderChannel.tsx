import { useOrderChannel } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesSourceChart } from './sales-source-chart';

export const RevenueByOrderChannel = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { orderChannelData, queryKey } = useOrderChannel({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesSourceChart
      title="주문수단별 매출"
      salesSourceData={orderChannelData}
      queryKey={queryKey}
    />
  );
};
