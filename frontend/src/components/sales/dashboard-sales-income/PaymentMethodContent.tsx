import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { PAYMENT_METHOD, SALES_SOURCE_COLORS } from '@/constants/sales';
import type { GetIncomStructureByPaymentMethodResponseDto } from '@/types/sales';

import { DashboardSalesIncomeContent } from './DashboardSalesIncomeContent';

const { DOUGHNUT_CHART_TITLE } = PAYMENT_METHOD;

type PaymentMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.PAYMENT_METHOD
>;

interface PaymentMethodContentProps extends GetIncomStructureByPaymentMethodResponseDto {
  cardCode: PaymentMethodCardCodes;
}

export const PaymentMethodContent = ({
  cardCode,
  insight,
  items,
}: PaymentMethodContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const paymentMethodData = items.map((item) => ({
    salesSourceType: item.payMethod,
    revenue: item.salesAmount,
    count: item.orderCount,
    changeRate: item.deltaShare,
  }));

  const chartData = paymentMethodData.map((data) => ({
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
        salesSourceData={paymentMethodData}
        title={DOUGHNUT_CHART_TITLE}
      />
    </DashboardSalesIncomeContent>
  );
};
