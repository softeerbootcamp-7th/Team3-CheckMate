import { useTotalSales } from '@/hooks/sales/sales-overview/useTotalSales';
import { formatNumber } from '@/utils/shared';

import { usePeriodTypeContext } from './period-type-provider';
import { OrderCountLabel } from './shared';

export const TotalRevenue = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { grossAmount, orderCount } = useTotalSales({
    periodType,
    startDate,
    endDate,
  });

  return (
    <article className="card flex h-25 w-103 items-center justify-between p-7">
      <div className="flex items-center gap-2">
        <h3>총매출</h3>
        <OrderCountLabel orderCount={orderCount} />
      </div>

      <div className="flex items-center gap-1">
        <strong className="headline-medium-semibold">
          {formatNumber(grossAmount)}
        </strong>
        <p className="title-medium-semibold text-grey-900">원</p>
      </div>
    </article>
  );
};
