import { useSalesType } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesSourceChart } from './sales-source-chart';

export const RevenueBySalesType = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { salesTypeData } = useSalesType({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesSourceChart title="판매유형별 매출" salesSourceData={salesTypeData} />
  );
};
