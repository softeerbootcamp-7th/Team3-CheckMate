import { useMemo, useState } from 'react';

import { CATEGORIES_RANKING_DATA } from '@/mocks/data/menu';
import type { CategoriesRevenue } from '@/types/menu/categoriesRevenue';
import type { DoughnutChartItem } from '@/types/shared';

import { DoughnutChart } from '../shared';

import { CategoryRevenueChartLegend } from './CategoryRevenueChartLegend';

export const CategoryRevenueRanking = () => {
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
    <article className="card">
      <h3>카테고리별 매출</h3>
      <div className="mx-auto my-4.5 size-45">
        <DoughnutChart
          title="카테고리별 매출 관련 도넛 차트"
          chartData={chartData}
        />
      </div>
      <CategoryRevenueChartLegend chartData={chartData} />
    </article>
  );
};
