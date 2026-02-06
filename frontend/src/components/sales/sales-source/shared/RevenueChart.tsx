import { useMemo, useState } from 'react';

import { DoughnutChart } from '@/components/shared';
import { SALES_SOURCE_COLORS } from '@/constants/sales';
import type { SalesSource } from '@/types/sales';
import type { DoughnutChartItem } from '@/types/shared';

import { SalesSourceChartLegend } from './SalesSourceChartLegend';

interface RevenueChartProps {
  data: SalesSource[];
  title: string;
}
export const RevenueChart = ({ data, title }: RevenueChartProps) => {
  const [salesSourceData] = useState<SalesSource[]>(data);

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      salesSourceData.map((item) => ({
        label: item.salesSourceType,
        value: item.revenue,
        color: SALES_SOURCE_COLORS[item.salesSourceType],
      })),
    [salesSourceData],
  );

  return (
    <article className="card">
      <h3>{title}</h3>

      <div className="mx-auto my-4.5 w-45">
        <DoughnutChart chartData={chartData} />
      </div>
      <SalesSourceChartLegend salesSourceData={salesSourceData} />
    </article>
  );
};
