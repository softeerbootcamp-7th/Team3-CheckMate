import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import {
  PAY_METHOD,
  SALES_SOURCE,
  SALES_SOURCE_COLORS,
} from '@/constants/sales';
import type { GetSalesSourceByPayMethodResponseDto } from '@/types/sales';
import { getSalesSourceInsight } from '@/utils/sales';

import { DashboardSalesSourceContent } from './DashboardSalesSourceContent';

const { DOUGHNUT_CHART_TITLE } = PAY_METHOD;

type PayMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.PAY_METHOD
>;

interface PayMethodContentProps extends GetSalesSourceByPayMethodResponseDto {
  cardCode: PayMethodCardCodes;
  disableAnimation?: boolean;
}

export const PayMethodContent = ({
  cardCode,
  insight,
  items,
  disableAnimation,
}: PayMethodContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const payMethodData = items.map((item) => ({
    salesSource: SALES_SOURCE.PAY_METHOD[item.payMethod],
    salesAmount: item.salesAmount,
    orderCount: item.orderCount,
    deltaShare: item.deltaShare,
  }));

  const chartData = payMethodData.map((data) => ({
    label: data.salesSource,
    value: data.salesAmount,
    color: SALES_SOURCE_COLORS[data.salesSource],
  }));

  const { topShare, topDeltaShare, topTypeLabel } =
    getSalesSourceInsight<GetSalesSourceByPayMethodResponseDto>(insight, items);

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
        salesSourceData={payMethodData}
        title={DOUGHNUT_CHART_TITLE}
        disableAnimation={disableAnimation}
      />
    </DashboardSalesSourceContent>
  );
};
