import { SALE_TYPE_DATA } from '@/mocks/data/sales';

import { RevenueChart } from './shared/RevenueChart';

export const RevenueBySaleType = () => {
  return <RevenueChart title="판매유형별 매출" data={SALE_TYPE_DATA} />;
};
