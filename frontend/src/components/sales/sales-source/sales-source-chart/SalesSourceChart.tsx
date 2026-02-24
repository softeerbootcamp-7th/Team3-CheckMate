import { useMemo } from 'react';

import type { QueryKey } from '@tanstack/react-query';

import { DoughnutChart, RefreshedTimeButton } from '@/components/shared';
import { SALES_SOURCE_COLORS } from '@/constants/sales';
import type { SalesSource } from '@/types/sales';
import type { DoughnutChartItem } from '@/types/shared';

import { usePeriodTypeContext } from '../period-type-provider';

import { SalesSourceChartLegend } from './SalesSourceChartLegend';

interface SalesSourceChartProps {
  salesSourceData: SalesSource[];
  title: string;
  queryKey: QueryKey;
}
export const SalesSourceChart = ({
  salesSourceData,
  title,
  queryKey,
}: SalesSourceChartProps) => {
  const { periodType } = usePeriodTypeContext();

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      salesSourceData.map((item) => ({
        label: item.salesSource,
        value: item.salesAmount,
        color: SALES_SOURCE_COLORS[item.salesSource],
      })),
    [salesSourceData],
  );

  return (
    <article className="card flex h-113 flex-col">
      <h3>{title}</h3>

      <div className="mx-auto my-4.5 w-45">
        <DoughnutChart
          title={`${title} 관련 도넛 차트`}
          chartData={chartData}
        />
      </div>

      <SalesSourceChartLegend
        salesSourceData={salesSourceData}
        periodType={periodType}
      />
      <RefreshedTimeButton queryKey={queryKey} />
    </article>
  );
};
