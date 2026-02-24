import { DefaultCardFetchBoundary } from '@/components/shared';

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
            <DefaultCardFetchBoundary className="h-70 w-85">
              <ActualRevenue />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary className="h-70 w-85">
              <OrderCount />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary className="h-70 w-85">
              <AverageRevenuePerOrder />
            </DefaultCardFetchBoundary>
          </div>
          <div className="flex gap-5">
            <DefaultCardFetchBoundary className="h-25 w-103">
              <TotalRevenue />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary className="h-25 w-157">
              <DiscountCancel />
            </DefaultCardFetchBoundary>
          </div>
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
