import { PAYMENT_METHOD_DATA } from '@/mocks/data/sales';

import { RevenueChart } from './shared/RevenueChart';

export const RevenueByPaymentMethod = () => {
  return <RevenueChart title="결제수단별 매출" data={PAYMENT_METHOD_DATA} />;
};
