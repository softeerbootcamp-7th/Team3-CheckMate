import { RefreshedTimeButton } from '@/components/shared';
import { useDiscountAndCancellation } from '@/hooks/sales';

import { usePeriodTypeContext } from './period-type-provider';
import { SalesCountAndRevenue } from './shared';

export const DiscountCancel = () => {
  const { periodType, startDate, endDate } = usePeriodTypeContext();

  const {
    discountAmount,
    canceledAmount,
    discountCount,
    cancelCount,
    queryKey,
  } = useDiscountAndCancellation({
    periodType,
    startDate,
    endDate,
  });

  return (
    <article className="card flex h-38 w-157 flex-col justify-end p-7 pb-5">
      <div className="flex items-center justify-between">
        <SalesCountAndRevenue
          title="할인"
          orderCount={discountCount}
          revenue={discountAmount}
        />
        <hr className="border-grey-200 mx-8 h-10 border" />
        <SalesCountAndRevenue
          title="취소"
          orderCount={cancelCount}
          revenue={canceledAmount}
        />
      </div>
      <RefreshedTimeButton queryKey={queryKey} />
    </article>
  );
};
