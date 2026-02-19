import { useSuspenseQuery } from '@tanstack/react-query';

import { SalesTrendContent } from '@/components/sales';
import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodesFromSection,
} from '@/constants/dashboard';
import { PERIOD_PRESETS } from '@/constants/shared';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetSalesTrendResponseDto } from '@/types/sales';

type DashboardSalesTrendCardCodes = ExtractCardCodesFromSection<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_TREND
>;

const TREND_CHART_WIDTH_FOR_RECENT_30_DAYS = 660;
const TREND_CHART_WIDTH = 1020;
const TREND_CHART_HEIGHT = 120;

interface DashboardSalesTrendCardProps {
  cardCode: DashboardSalesTrendCardCodes;
}

export const DashboardSalesTrendCard = ({
  cardCode,
}: DashboardSalesTrendCardProps) => {
  const { period } = DASHBOARD_METRIC_CARDS[cardCode];
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption = createCardDetailQuery<GetSalesTrendResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  const salesTrendData = {
    data: {
      mainX: data.items.map((item) => ({ amount: item.label, unit: '' })),
      mainY: data.items.map((item) => ({ amount: item.netAmount, unit: '원' })),
      subX: data.items.map((item) => ({ amount: item.label, unit: '' })),
      subY: data.items.map((item) => ({ amount: item.orderCount, unit: '건' })),
    },
    color: 'var(--color-grey-400)',
  };

  const trendChartWidth =
    period === PERIOD_PRESETS.recentDays7_14_30.recent30Days
      ? TREND_CHART_WIDTH_FOR_RECENT_30_DAYS
      : TREND_CHART_WIDTH;
  const trendChartHeight = TREND_CHART_HEIGHT;

  return (
    <SalesTrendContent
      cardCode={cardCode}
      salesTrendData={salesTrendData}
      trendChartWidth={trendChartWidth}
      trendChartHeight={trendChartHeight}
    />
  );
};
