import { useMemo, useState } from 'react';

import { DoughnutChart } from '@/components/shared';
import { SALES_SOURCE_COLORS } from '@/constants/sales';
import type { SalesSource } from '@/types/sales';
import type { DoughnutChartItem } from '@/types/shared';

import { usePeriodTypeContext } from '../period-type-provider';

import { SalesSourceChartLegend } from './SalesSourceChartLegend';

interface SalesSourceChartProps {
  data: SalesSource[];
  title: string;
}
export const SalesSourceChart = ({ data, title }: SalesSourceChartProps) => {
  const { periodType } = usePeriodTypeContext();
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
    <article className="card flex h-[400px] flex-col">
      <h3>{title}</h3>

      <div className="mx-auto my-4.5 w-45">
        <DoughnutChart chartData={chartData} />
      </div>

      <SalesSourceChartLegend
        salesSourceData={salesSourceData}
        periodType={periodType}
      />
    </article>
  );
};
