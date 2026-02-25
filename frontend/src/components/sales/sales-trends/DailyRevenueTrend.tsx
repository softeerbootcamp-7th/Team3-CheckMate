import {
  BarLineChart,
  DefaultCardWrapper,
  PeriodSelect,
  RefreshedTimeButton,
} from '@/components/shared';
import { SALES_TREND_DETAIL } from '@/constants/sales';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useDailyRevenueTrend } from '@/hooks/sales';

import { useDailyRevenueTrendPeriodType } from './period-type-provider';
import { SalesTrendCaption } from './SalesTrendCaption';

export const DailyRevenueTrend = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useDailyRevenueTrendPeriodType();

  const {
    queryKey,
    dailyRevenueTrendData,
    dailyRevenueTrendLabel,
    dailyRevenueTrendTooltipContent,
  } = useDailyRevenueTrend({
    periodType,
    startDate,
    endDate,
  });

  const { CHART_WIDTH, CHART_HEIGHT, CHART_Y_GUIDE_LINE_COUNT } =
    SALES_TREND_DETAIL;

  return (
    <DefaultCardWrapper
      className="flex h-70 w-full flex-col justify-start gap-5"
      title={dailyRevenueTrendLabel}
      aria-label={dailyRevenueTrendLabel}
    >
      <SalesTrendCaption className="absolute top-5.5 left-30" />
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.recentDays7_14_30}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        className="absolute top-5 right-2"
      />
      <div className="min-h-0 flex-1 pt-2">
        <BarLineChart
          barLineChartSeries={dailyRevenueTrendData}
          viewBoxWidth={CHART_WIDTH}
          viewBoxHeight={CHART_HEIGHT}
          hasXAxis
          showYGuideLine
          yGuideLineCount={CHART_Y_GUIDE_LINE_COUNT}
          activeTooltip
          tooltipContent={dailyRevenueTrendTooltipContent}
          xAxisType="right-arrow"
          chartTitle={dailyRevenueTrendLabel}
          chartDescription="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        />
        <RefreshedTimeButton queryKey={queryKey} />
      </div>
    </DefaultCardWrapper>
  );
};
