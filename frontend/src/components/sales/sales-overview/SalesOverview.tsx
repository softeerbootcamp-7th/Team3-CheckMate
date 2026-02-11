import { ActualRevenue } from './ActualRevenue';
import { AverageRevenuePerOrder } from './AverageRevenuePerOrder';
import { DiscountCancel } from './DiscountCancel';
import { OrderCount } from './OrderCount';
import { PeriodTypeProvider } from './period-type-provider';
import { SalesOverviewHeader } from './SalesOverviewHeader';
import { TotalRevenue } from './TotalRevenue';

export const SalesOverview = () => {
  return (
    <section aria-label="매출 현황">
      <PeriodTypeProvider>
        <SalesOverviewHeader />
        <section className="mt-4 grid gap-5">
          <div className="grid grid-cols-3 gap-5">
            <ActualRevenue />
            <OrderCount />
            <AverageRevenuePerOrder />
          </div>
          <div className="flex gap-5">
            <TotalRevenue />
            <DiscountCancel />
          </div>
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
