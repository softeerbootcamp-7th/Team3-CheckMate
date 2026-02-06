import { ORDER_METHOD_DATA } from '@/mocks/data/sales';

import { RevenueChart } from './shared/RevenueChart';

export const RevenueByOrderMethod = () => {
  return <RevenueChart title="주문수단별 매출" data={ORDER_METHOD_DATA} />;
};
