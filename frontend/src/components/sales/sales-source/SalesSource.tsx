import { PeriodTypeProvider } from './period-type-provider';
import { RevenueByOrderChannel } from './RevenueByOrderChannel';
import { RevenueByPayMethod } from './RevenueByPayMethod';
import { RevenueBySaleType } from './RevenueBySaleType';
import { SalesSourceHeader } from './SalesSourceHeader';

export const SalesSource = () => {
  return (
    <section aria-label="매출 유입 구조">
      <PeriodTypeProvider>
        <SalesSourceHeader />
        <section className="mt-4 grid grid-cols-3 gap-5">
          <RevenueBySaleType />
          <RevenueByOrderChannel />
          <RevenueByPayMethod />
        </section>
      </PeriodTypeProvider>
    </section>
  );
};
