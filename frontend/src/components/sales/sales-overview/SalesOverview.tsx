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
            <DefaultCardFetchBoundary cardWidth={340} cardHeight={228}>
              <ActualRevenue />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary cardWidth={340} cardHeight={228}>
              <OrderCount />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary cardWidth={340} cardHeight={228}>
              <AverageRevenuePerOrder />
            </DefaultCardFetchBoundary>
          </div>
          <div className="flex gap-5">
            <DefaultCardFetchBoundary cardWidth={412} cardHeight={100}>
              <TotalRevenue />
            </DefaultCardFetchBoundary>
            <DefaultCardFetchBoundary cardWidth={628} cardHeight={100}>
              <DiscountCancel />
            </DefaultCardFetchBoundary>
          </div>
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
