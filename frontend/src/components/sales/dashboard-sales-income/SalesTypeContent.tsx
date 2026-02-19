import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { SALES_SOURCE_COLORS, SALES_TYPE } from '@/constants/sales';
import type { GetIncomeStructureBySalesTypeResponseDto } from '@/types/sales';

import { DashboardSalesIncomeContent } from './DashboardSalesIncomeContent';

const { DOUGHNUT_CHART_TITLE } = SALES_TYPE;

type DashboardSalesIncomeCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.SALES_TYPE
>;

interface SalesTypeContentProps extends GetIncomeStructureBySalesTypeResponseDto {
  cardCode: DashboardSalesIncomeCardCodes;
}

export const SalesTypeContent = ({
  cardCode,
  insight,
  items,
}: SalesTypeContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const salesTypeData = items.map((item) => ({
    salesSourceType: item.salesType,
    revenue: item.salesAmount,
    count: item.orderCount,
    changeRate: item.deltaShare,
  }));

  const chartData = salesTypeData.map((data) => ({
    label: data.salesSourceType,
    value: data.revenue,
    color: SALES_SOURCE_COLORS[data.salesSourceType],
  }));

  return (
    <DashboardSalesIncomeContent>
      <DashboardSalesIncomeContent.ComparisonMessage
        periodType={periodType}
        topType={insight.topType}
        topShare={insight.topShare}
        deltaShare={insight.deltaShare}
      />
      <DashboardSalesIncomeContent.DoughnutChart
        periodType={periodType}
        chartData={chartData}
        salesSourceData={salesTypeData}
        title={DOUGHNUT_CHART_TITLE}
      />
    </DashboardSalesIncomeContent>
  );
};
