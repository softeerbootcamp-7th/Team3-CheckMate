import { ORDER_METHOD_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueByOrderMethod = () => {
  return (
    <SalesSourceChart
      title="주문수단별 매출"
      salesSourceData={ORDER_METHOD_DATA}
    />
  );
};
