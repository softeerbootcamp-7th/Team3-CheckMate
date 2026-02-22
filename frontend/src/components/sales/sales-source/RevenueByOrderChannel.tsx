import { useOrderChannel } from '@/hooks/sales/sales-source/useOrderChannel';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesSourceChart } from './sales-source-chart';

export const RevenueByOrderChannel = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { orderChannelData } = useOrderChannel({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesSourceChart
      title="주문수단별 매출"
      salesSourceData={orderChannelData}
    />
  );
};
