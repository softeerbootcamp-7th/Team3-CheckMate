import { DoughnutChart } from '@/components/shared';
import { SALES_SOURCE_DATA } from '@/mocks/data/sales';

export const RevenueBySaleType = () => {
  return (
    <article className="card">
      <h3>판매유형별 매출</h3>

      <div className="mx-auto my-4.5 size-45">
        <DoughnutChart chartData={SALES_SOURCE_DATA} />
      </div>
    </article>
  );
};
