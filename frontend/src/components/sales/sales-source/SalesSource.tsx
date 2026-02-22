import { DefaultCardFetchBoundary } from '@/components/shared';

import { PeriodTypeProvider } from './period-type-provider';
import { RevenueByOrderChannel } from './RevenueByOrderChannel';
import { RevenueByPayMethod } from './RevenueByPayMethod';
import { RevenueBySalesType } from './RevenueBySalesType';
import { SalesSourceHeader } from './SalesSourceHeader';

export const SalesSource = () => {
  return (
    <section aria-label="매출 유입 구조">
      <PeriodTypeProvider>
        <SalesSourceHeader />
        <section className="mt-4 grid grid-cols-3 gap-5">
          <DefaultCardFetchBoundary className="h-[400px] w-full">
            <RevenueBySalesType />
          </DefaultCardFetchBoundary>
          <DefaultCardFetchBoundary className="h-[400px] w-full">
            <RevenueByOrderChannel />
          </DefaultCardFetchBoundary>
          <DefaultCardFetchBoundary className="h-[400px] w-full">
            <RevenueByPayMethod />
          </DefaultCardFetchBoundary>
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
