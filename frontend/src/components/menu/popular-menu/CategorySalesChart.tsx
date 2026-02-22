import { useMemo, useState } from 'react';

import { DoughnutChart } from '@/components/shared';
import { CATEGORY_SALES_DATA } from '@/mocks/data/menu';
import type { CategorySales } from '@/types/menu';
import type { DoughnutChartItem } from '@/types/shared/doughnutChartItem';

import { CategorySalesChartLegend } from './CategorySalesChartLegend';

export const CategorySalesChart = () => {
  const [categoriesRevenueData] =
    useState<CategorySales[]>(CATEGORY_SALES_DATA);

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      [...categoriesRevenueData]
        .sort((a, b) => b.totalSalesAmount - a.totalSalesAmount)
        .map((item) => ({
          label: item.category,
          value: item.totalSalesAmount,
        })),
    [categoriesRevenueData],
  );
  return (
    <div className="flex items-center gap-15">
      <div className="size-45">
        <DoughnutChart
          title="카테고리별 매출 관련 도넛 차트"
          chartData={chartData}
        />
      </div>
      <CategorySalesChartLegend chartData={chartData} />
    </div>
  );
};
