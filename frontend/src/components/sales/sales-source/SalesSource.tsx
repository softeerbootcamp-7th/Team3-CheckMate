import { DefaultCardFetchBoundary } from '@/components/shared';
import { SALES_PERIOD_LOCAL_STORAGE_KEY } from '@/constants/sales';

import { PeriodTypeProvider } from './period-type-provider';
import { RevenueByOrderChannel } from './RevenueByOrderChannel';
import { RevenueByPayMethod } from './RevenueByPayMethod';
import { RevenueBySalesType } from './RevenueBySalesType';
import { SalesSourceHeader } from './SalesSourceHeader';

export const SalesSource = () => {
  return (
    <section aria-label="매출 유입 구조">
      <PeriodTypeProvider
        periodKey={SALES_PERIOD_LOCAL_STORAGE_KEY.salesSource}
      >
        <SalesSourceHeader />
        <section className="mt-4 grid grid-cols-3 gap-5">
          <DefaultCardFetchBoundary className="h-113 w-full">
            <RevenueBySalesType />
          </DefaultCardFetchBoundary>
          <DefaultCardFetchBoundary className="h-113 w-full">
            <RevenueByOrderChannel />
          </DefaultCardFetchBoundary>
          <DefaultCardFetchBoundary className="h-113 w-full">
            <RevenueByPayMethod />
          </DefaultCardFetchBoundary>
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
