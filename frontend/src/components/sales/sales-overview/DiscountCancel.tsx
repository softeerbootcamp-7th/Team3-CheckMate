import { useDiscountAndCancellation } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesCountAndRevenue } from './shared';

export const DiscountCancel = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const { discountAmount, canceledAmount, orderCount } =
    useDiscountAndCancellation({
      periodType,
      startDate,
      endDate,
    });

  return (
    <article className="card flex h-25 w-157 items-center justify-between p-7">
      <SalesCountAndRevenue
        title="할인"
        orderCount={orderCount}
        revenue={discountAmount}
      />
      <hr className="border-grey-200 mx-8 h-10 border" />

      <SalesCountAndRevenue
        title="취소"
        orderCount={orderCount}
        revenue={canceledAmount}
      />
    </article>
  );
};
