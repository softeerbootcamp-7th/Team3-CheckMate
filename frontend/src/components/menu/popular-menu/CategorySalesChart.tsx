import { useMemo, useState } from 'react';

import { DoughnutChart } from '@/components/shared';
import { CATEGORIES_RANKING_DATA } from '@/mocks/data/menu/categoriesRevenue';
import type { CategoriesRevenue } from '@/types/menu/categoriesRevenue';
import type { DoughnutChartItem } from '@/types/shared/doughnutChartItem';

import { CategorySalesChartLegend } from './CategorySalesChartLegend';

export const CategorySalesChart = () => {
  const [categoriesRevenueData] = useState<CategoriesRevenue[]>(
    CATEGORIES_RANKING_DATA,
  );

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      [...categoriesRevenueData]
        .sort((a, b) => b.revenue - a.revenue)
        .map((item) => ({
          label: item.category,
          value: item.revenue,
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
