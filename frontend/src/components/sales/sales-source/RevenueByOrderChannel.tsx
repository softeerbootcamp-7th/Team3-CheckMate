import { ORDER_CHANNEL_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueByOrderChannel = () => {
  return (
    <SalesSourceChart
      title="주문수단별 매출"
      salesSourceData={ORDER_CHANNEL_DATA}
    />
  );
};
