import { DoughnutChart } from '@/components/shared';
import type { DoughnutChartItem } from '@/types/shared';

import { CategorySalesChartLegend } from './CategorySalesChartLegend';

interface CategorySalesChartProps {
  categorySalesChartData: DoughnutChartItem[];
  isEmptyCategorySales: boolean;
}

export const CategorySalesChart = ({
  categorySalesChartData,
  isEmptyCategorySales,
}: CategorySalesChartProps) => {
  return (
    <div className="flex items-center gap-15">
      <div className="size-45">
        <DoughnutChart
          title="카테고리별 매출 관련 도넛 차트"
          chartData={categorySalesChartData}
        />
      </div>
      <CategorySalesChartLegend
        chartData={categorySalesChartData}
        isEmpty={isEmptyCategorySales}
      />
    </div>
  );
};
