import { DoughnutChart } from '@/components/shared';
import { useCategorySales } from '@/hooks/menu';

import { CategorySalesChartLegend } from './CategorySalesChartLegend';
import { usePopularMenuPeriodType } from './period-type-provider';

export const CategorySalesChart = () => {
  const { periodType, startDate, endDate } = usePopularMenuPeriodType();

  const { isEmptyCategorySales, categorySalesChartData } = useCategorySales({
    periodType,
    startDate,
    endDate,
  });

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
