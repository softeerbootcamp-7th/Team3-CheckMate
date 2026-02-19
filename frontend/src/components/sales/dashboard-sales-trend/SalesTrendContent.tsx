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
  const { period } = DASHBOARD_METRIC_CARDS[cardCode];
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
      <div className="caption-large-medium text-grey-600 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="h-4.5 w-2 rounded-t-[1px] bg-[linear-gradient(180deg,rgba(33,33,33,0.40)_0%,rgba(33,33,33,0.10)_100%)]" />
          <span>실매출</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-grey-400 size-1.25 rounded-full" />
          <span>주문건수</span>
        </div>
      </div>
      <div
        style={{ width: trendChartWidthValue, height: trendChartHeightValue }}
      >
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
      </div>
    </article>
  );
};
