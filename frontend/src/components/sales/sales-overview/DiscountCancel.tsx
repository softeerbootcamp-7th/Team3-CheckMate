import { SalesCountAndRevenue } from './shared';

export const DiscountCancel = () => {
  const mockedDiscountOrderCount = 10;
  const mockedDiscountRevenue = -12000;
  const mockedCancelOrderCount = 10;
  const mockedCancelRevenue = -10000;

  return (
    <article className="card flex h-25 w-157 items-center justify-between p-7">
      <SalesCountAndRevenue
        title="할인"
        orderCount={mockedDiscountOrderCount}
        revenue={mockedDiscountRevenue}
      />
      <hr className="border-grey-200 mx-8 h-10 border" />

      <SalesCountAndRevenue
        title="취소"
        orderCount={mockedCancelOrderCount}
        revenue={mockedCancelRevenue}
      />
    </article>
  );
};
