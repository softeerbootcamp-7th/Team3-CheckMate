import { DoughnutChart } from '@/components/shared';
import { useCategorySales } from '@/hooks/menu';

import { MenuSalesRankingCardContentEmptyView } from '../shared';

import { CategorySalesChartLegend } from './CategorySalesChartLegend';
import { usePopularMenuPeriodType } from './period-type-provider';

export const CategorySalesChart = () => {
  const { periodType, startDate, endDate } = usePopularMenuPeriodType();

  const { cardCode, categorySalesChartData, isEmptyCategorySales } =
    useCategorySales({
      periodType,
      startDate,
      endDate,
    });
  if (isEmptyCategorySales) {
    return <MenuSalesRankingCardContentEmptyView cardCode={cardCode} />;
  }

  return (
    <div className="flex items-center gap-15">
      <div className="size-45">
        <DoughnutChart
          title="카테고리별 매출 관련 도넛 차트"
          chartData={categorySalesChartData}
        />
      </div>
      <CategorySalesChartLegend chartData={categorySalesChartData} />
    </div>
  );
};
