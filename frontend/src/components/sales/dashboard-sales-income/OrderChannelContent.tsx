import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { ORDER_METHOD, SALES_SOURCE_COLORS } from '@/constants/sales';
import type { GetIncomeStructureByOrderChannelResponseDto } from '@/types/sales';

import { DashboardSalesIncomeContent } from './DashboardSalesIncomeContent';

const { DOUGHNUT_CHART_TITLE } = ORDER_METHOD;

type OrderMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.ORDER_CHANNEL
>;

interface OrderChannelContentProps extends GetIncomeStructureByOrderChannelResponseDto {
  cardCode: OrderMethodCardCodes;
}

export const OrderChannelContent = ({
  cardCode,
  insight,
  items,
}: OrderChannelContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const orderMethodData = items.map((item) => ({
    salesSourceType: item.orderChannel,
    revenue: item.salesAmount,
    count: item.orderCount,
    changeRate: item.deltaShare,
  }));

  const chartData = orderMethodData.map((data) => ({
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
        salesSourceData={orderMethodData}
        title={DOUGHNUT_CHART_TITLE}
      />
    </DashboardSalesIncomeContent>
  );
};
