import { SALE_TYPE_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueBySaleType = () => {
  return (
    <SalesSourceChart
      title="판매유형별 매출"
      salesSourceData={SALE_TYPE_DATA}
    />
  );
};
