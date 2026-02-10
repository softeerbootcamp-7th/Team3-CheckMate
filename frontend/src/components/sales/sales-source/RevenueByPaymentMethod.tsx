import { PAYMENT_METHOD_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueByPaymentMethod = () => {
  return (
    <SalesSourceChart
      title="결제수단별 매출"
      salesSourceData={PAYMENT_METHOD_DATA}
    />
  );
};
