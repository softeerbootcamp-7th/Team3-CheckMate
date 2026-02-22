import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import {
  SALES_SOURCE,
  SALES_SOURCE_COLORS,
  SALES_TYPE,
} from '@/constants/sales';
import type { GetSalesSourceBySalesTypeResponseDto } from '@/types/sales';
import { getSalesSourceInsight } from '@/utils/sales';

import { DashboardSalesSourceContent } from './DashboardSalesSourceContent';

const { DOUGHNUT_CHART_TITLE } = SALES_TYPE;

type DashboardSalesSourceCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.SALES_TYPE
>;

interface SalesTypeContentProps extends GetSalesSourceBySalesTypeResponseDto {
  cardCode: DashboardSalesSourceCardCodes;
}

export const SalesTypeContent = ({
  cardCode,
  insight,
  items,
}: SalesTypeContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const salesTypeData = items.map((item) => ({
    salesSource: SALES_SOURCE.SALES_TYPE[item.salesType],
    salesAmount: item.salesAmount,
    orderCount: item.orderCount,
    deltaShare: item.deltaShare,
  }));

  const chartData = salesTypeData.map((data) => ({
    label: data.salesSource,
    value: data.salesAmount,
    color: SALES_SOURCE_COLORS[data.salesSource],
  }));

  const { topShare, topDeltaShare, topTypeLabel } =
    getSalesSourceInsight<GetSalesSourceBySalesTypeResponseDto>(insight, items);

  return (
    <DashboardSalesSourceContent>
      <DashboardSalesSourceContent.ComparisonMessage
        periodType={periodType}
        topTypeLabel={topTypeLabel}
        topShare={topShare}
        deltaShare={topDeltaShare}
      />
      <DashboardSalesSourceContent.DoughnutChart
        periodType={periodType}
        chartData={chartData}
        salesSourceData={salesTypeData}
        title={DOUGHNUT_CHART_TITLE}
      />
    </DashboardSalesSourceContent>
  );
};
