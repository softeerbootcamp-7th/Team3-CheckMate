import { usePayMethod } from '@/hooks/sales/sales-source/usePayMethod';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesSourceChart } from './sales-source-chart';

export const RevenueByPayMethod = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { payMethodData } = usePayMethod({
    periodType,
    startDate,
    endDate,
  });

  return (
    <SalesSourceChart title="결제수단별 매출" salesSourceData={payMethodData} />
  );
};
