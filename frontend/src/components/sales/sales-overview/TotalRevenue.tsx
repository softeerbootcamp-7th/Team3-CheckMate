import { formatNumber } from '@/utils/shared';

import { OrderCountLabel } from './shared';

export const TotalRevenue = () => {
  const mockedTotalOrderCount = 104;
  const mockedTotalRevenue = 415600;

  return (
    <article className="card flex h-25 w-103 items-center justify-between p-7">
      <div className="flex items-center gap-2">
        <h3>총매출</h3>
        <OrderCountLabel orderCount={mockedTotalOrderCount} />
      </div>

      <div className="flex items-center gap-1">
        <strong className="headline-medium-semibold">
          {formatNumber(mockedTotalRevenue)}
        </strong>
        <p className="title-medium-semibold text-grey-900">원</p>
      </div>
    </article>
  );
};
