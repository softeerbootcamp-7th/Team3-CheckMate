import { BarLineChart } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodesFromSection,
} from '@/constants/dashboard';
import { SALES_TREND } from '@/constants/sales';
import { PERIOD_PRESETS } from '@/constants/shared';
import type { BarLineChartSeries } from '@/types/shared';
import { cn } from '@/utils/shared';

import { SalesTrendCaption } from '../sales-trends';

type SalesTrendCardCode = ExtractCardCodesFromSection<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_TREND
>;

interface SalesTrendContentProps {
  cardCode: SalesTrendCardCode;
  salesTrendData: BarLineChartSeries;
  trendChartWidth?: number;
  trendChartHeight?: number;
  className?: string;
}

export const SalesTrendContent = ({
  cardCode,
  salesTrendData,
  trendChartWidth,
  trendChartHeight,
  className,
}: SalesTrendContentProps) => {
  const { period, label } = DASHBOARD_METRIC_CARDS[cardCode];
  const {
    DEFAULT_TREND_CHART_WIDTH,
    DEFAULT_TREND_CHART_WIDTH_FOR_RECENT_30_DAYS,
    DEFAULT_TREND_CHART_HEIGHT,
  } = SALES_TREND;

  const trendChartWidthValue =
    trendChartWidth ??
    (period === PERIOD_PRESETS.recentDays7_14_30.recent30Days
      ? DEFAULT_TREND_CHART_WIDTH_FOR_RECENT_30_DAYS
      : DEFAULT_TREND_CHART_WIDTH);

  const trendChartHeightValue = trendChartHeight ?? DEFAULT_TREND_CHART_HEIGHT;

  return (
    <article
      className={cn(
        'flex flex-col items-start justify-start gap-4',
        period === PERIOD_PRESETS.recentDays7_14_30.recent30Days
          ? 'w-170'
          : 'w-265',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <h3 className="body-medium-semibold text-grey-700">{label}</h3>
        <SalesTrendCaption />
      </div>
      <BarLineChart
        viewBoxWidth={trendChartWidthValue}
        viewBoxHeight={trendChartHeightValue}
        barLineChartSeries={salesTrendData}
        hasXAxis
        showYGuideLine
        yGuideLineCount={5}
        activeTooltip={false}
        xAxisType="right-arrow"
      />
    </article>
  );
};
