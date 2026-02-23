import { useMemo } from 'react';

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
import type { GetSalesSourceByOrderChannelResponseDto } from '@/types/sales';
import { getSalesSourceInsight } from '@/utils/sales';

import { DashboardSalesSourceContent } from './DashboardSalesSourceContent';

const { DOUGHNUT_CHART_TITLE } = ORDER_CHANNEL;

type OrderChannelCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.ORDER_CHANNEL
>;

interface OrderChannelContentProps extends GetSalesSourceByOrderChannelResponseDto {
  cardCode: OrderChannelCardCodes;
  disableAnimation?: boolean;
}

export const OrderChannelContent = ({
  cardCode,
  insight,
  items,
  disableAnimation,
}: OrderChannelContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const orderChannelData = useMemo(
    () =>
      Object.entries(SALES_SOURCE.ORDER_CHANNEL).map(([key, label]) => {
        const found = items.find((item) => item.orderChannel === key);
        return {
          salesSource: label,
          salesAmount: found?.salesAmount ?? 0,
          orderCount: found?.orderCount ?? 0,
          deltaShare: found?.deltaShare ?? 0,
        };
      }),
    [items],
  );

  const chartData = orderChannelData.map((data) => ({
    label: data.salesSource,
    value: data.salesAmount,
    color: SALES_SOURCE_COLORS[data.salesSource],
  }));

  const { topShare, topDeltaShare, topTypeLabel } =
    getSalesSourceInsight<GetSalesSourceByOrderChannelResponseDto>(
      insight,
      items,
    );

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
        salesSourceData={orderChannelData}
        title={DOUGHNUT_CHART_TITLE}
        disableAnimation={disableAnimation}
      />
    </DashboardSalesSourceContent>
  );
};
