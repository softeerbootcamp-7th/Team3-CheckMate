import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import {
  isSalesSourceType,
  ORDER_METHOD,
  SALES_SOURCE_COLORS,
} from '@/constants/sales';
import type { GetIncomStructureByOrderMethodResponseDto } from '@/types/sales';
import { assertNever, type Nullable } from '@/utils/shared';

import { DashboardSalesIncomeContent } from './DashboardSalesIncomeContent';

const {
  EXAMPLE_TOP_TYPE,
  EXAMPLE_TOP_SHARE,
  EXAMPLE_DELTA_SHARE,
  EXAMPLE_ORDER_METHOD_DATA,
  DOUGHNUT_CHART_TITLE,
} = ORDER_METHOD;

type OrderMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.ORDER_METHOD
>;

interface OrderMethodContentProps extends Nullable<GetIncomStructureByOrderMethodResponseDto> {
  cardCode: OrderMethodCardCodes;
}

export const OrderMethodContent = ({
  cardCode,
  insight,
  items,
}: OrderMethodContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const orderMethodData = (items ?? EXAMPLE_ORDER_METHOD_DATA).map((item) => {
    if (!isSalesSourceType(item.orderChannel)) {
      return assertNever(
        item.orderChannel as never,
        `${item.orderChannel}는 유효하지 않은 주문수단입니다.`,
      );
    }
    return {
      salesSourceType: item.orderChannel,
      revenue: item.salesAmount,
      count: item.orderCount,
      changeRate: item.deltaShare,
    };
  });

  const chartData = orderMethodData.map((data) => ({
    label: data.salesSourceType,
    value: data.revenue,
    color: SALES_SOURCE_COLORS[data.salesSourceType],
  }));

  return (
    <DashboardSalesIncomeContent>
      <DashboardSalesIncomeContent.ComparisonMessage
        periodType={periodType}
        topType={insight?.topType ?? EXAMPLE_TOP_TYPE}
        topShare={insight?.topShare ?? EXAMPLE_TOP_SHARE}
        deltaShare={insight?.deltaShare ?? EXAMPLE_DELTA_SHARE}
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
