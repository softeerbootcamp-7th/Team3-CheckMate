import { useMemo, useState } from 'react';

import { CategoryRevenueChartLegend } from '@/components/menu/CategoryRevenueChartLegend';
import { DoughnutChart } from '@/components/shared/doughnut-chart/DoughnutChart';
import { CATEGORIES_RANKING_DATA } from '@/mocks/data/menu';
import type { CategoriesRevenue } from '@/types/menu/categoriesRevenue';
import type { DoughnutChartItem } from '@/types/shared';

export const RevenueByOrderMethod = () => {
  const [categoriesRevenueData] = useState<CategoriesRevenue[]>(
    CATEGORIES_RANKING_DATA,
  );

  const chartData: DoughnutChartItem[] = useMemo(
    () =>
      categoriesRevenueData
        .sort((a, b) => b.revenue - a.revenue)
        .map((item) => ({
          label: item.category,
          value: item.revenue,
        })),
    [categoriesRevenueData],
  );

  return (
    <article className="card">
      <h3>주문수단별 매출</h3>
      <div className="mx-auto my-4.5 size-45">
        <DoughnutChart chartData={chartData} />
      </div>
      <CategoryRevenueChartLegend chartData={chartData} />
    </article>
  );
};
