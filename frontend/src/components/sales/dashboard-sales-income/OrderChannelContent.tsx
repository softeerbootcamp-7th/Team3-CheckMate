import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import {
  ORDER_CHANNEL,
  SALES_SOURCE,
  SALES_SOURCE_COLORS,
} from '@/constants/sales';
import type { GetIncomeStructureByOrderChannelResponseDto } from '@/types/sales';
import { getSalesIncomeStructureInsight } from '@/utils/sales';

import { DashboardSalesIncomeContent } from './DashboardSalesIncomeContent';

const { DOUGHNUT_CHART_TITLE } = ORDER_CHANNEL;

type OrderChannelCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.ORDER_CHANNEL
>;

interface OrderChannelContentProps extends GetIncomeStructureByOrderChannelResponseDto {
  cardCode: OrderChannelCardCodes;
}

export const OrderChannelContent = ({
  cardCode,
  insight,
  items,
}: OrderChannelContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const orderChannelData = items.map((item) => ({
    salesSourceType: SALES_SOURCE.ORDER_METHOD[item.orderChannel],
    revenue: item.salesAmount,
    count: item.orderCount,
    changeRate: item.deltaShare,
  }));

  const chartData = orderChannelData.map((data) => ({
    label: data.salesSourceType,
    value: data.revenue,
    color: SALES_SOURCE_COLORS[data.salesSourceType],
  }));

  const { topShare, topDeltaShare, topTypeLabel } =
    getSalesIncomeStructureInsight<GetIncomeStructureByOrderChannelResponseDto>(
      insight,
      items,
    );

  return (
    <DashboardSalesIncomeContent>
      <DashboardSalesIncomeContent.ComparisonMessage
        periodType={periodType}
        topTypeLabel={topTypeLabel}
        topShare={topShare}
        deltaShare={topDeltaShare}
      />
      <DashboardSalesIncomeContent.DoughnutChart
        periodType={periodType}
        chartData={chartData}
        salesSourceData={orderChannelData}
        title={DOUGHNUT_CHART_TITLE}
      />
    </DashboardSalesIncomeContent>
  );
};
