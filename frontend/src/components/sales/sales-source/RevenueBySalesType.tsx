import { SALES_TYPE_DATA } from '@/mocks/data/sales';

import { SalesSourceChart } from './sales-source-chart';

export const RevenueBySalesType = () => {
  return (
    <SalesSourceChart
      title="판매유형별 매출"
      salesSourceData={SALES_TYPE_DATA}
    />
  );
};
