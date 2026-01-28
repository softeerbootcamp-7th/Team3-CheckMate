import { OrderCountLabel } from './OrderCountLabel';

interface SalesCountAndRevenueProps {
  title: string;
  orderCount: number;
  revenue: number;
}
export const SalesCountAndRevenue = ({
  title,
  orderCount,
  revenue,
}: SalesCountAndRevenueProps) => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-2">
        <h3>{title}</h3>
        <OrderCountLabel orderCount={orderCount} />
      </div>

      <div className="flex items-center gap-1">
        <strong className="title-large-semibold">
          {revenue.toLocaleString('ko-KR')}
        </strong>
        <p className="title-small-semibold text-grey-900">원</p>
      </div>
    </div>
  );
};
