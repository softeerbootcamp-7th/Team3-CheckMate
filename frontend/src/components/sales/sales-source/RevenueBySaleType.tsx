import { useMemo, useState } from 'react';

import { DoughnutChart } from '@/components/shared';
import { SALES_SOURCE_COLORS } from '@/constants/sales';
import { ORDER_METHOD_DATA } from '@/mocks/data/sales';
import type { SalesSource } from '@/types/sales';
import type { DoughnutChartItem } from '@/types/shared';

import { SalesSourceChartLegend } from './shared';

export const RevenueBySaleType = () => {
  const [orderMethodData] = useState<SalesSource[]>(ORDER_METHOD_DATA);

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      orderMethodData
        .sort((a, b) => b.revenue - a.revenue)
        .map((item) => ({
          label: item.salesSourceType,
          value: item.revenue,
          color: SALES_SOURCE_COLORS[item.salesSourceType],
        })),
    [orderMethodData],
  );

  return (
    <article className="card">
      <h3>판매유형별 매출</h3>

      <div className="mx-auto my-4.5 w-45">
        <DoughnutChart chartData={chartData} />
      </div>
      <SalesSourceChartLegend salesSourceData={orderMethodData} />
    </article>
  );
};
