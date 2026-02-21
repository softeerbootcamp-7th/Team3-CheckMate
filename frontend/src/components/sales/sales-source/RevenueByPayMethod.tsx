import { PAY_METHOD_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueByPayMethod = () => {
  return (
    <SalesSourceChart
      title="결제수단별 매출"
      salesSourceData={PAY_METHOD_DATA}
    />
  );
};
