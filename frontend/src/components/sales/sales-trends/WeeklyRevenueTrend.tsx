import {
  BarLineChart,
  DefaultCardWrapper,
  PeriodSelect,
} from '@/components/shared';
import { SALES_TREND_DETAIL } from '@/constants/sales';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useWeeklyRevenueTrend } from '@/hooks/sales';

import { useWeeklyRevenueTrendPeriodType } from './period-type-provider';
import { SalesTrendCaption } from './SalesTrendCaption';

export const WeeklyRevenueTrend = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useWeeklyRevenueTrendPeriodType();
  const {
    weeklyRevenueTrendData,
    weeklyRevenueTrendLabel,
    weeklyRevenueTrendTooltipContent,
  } = useWeeklyRevenueTrend({
    periodType,
    startDate,
    endDate,
  });

  const { CHART_WIDTH, CHART_HEIGHT, CHART_Y_GUIDE_LINE_COUNT } =
    SALES_TREND_DETAIL;
  return (
    <DefaultCardWrapper
      title="주별 매출 추이"
      className="flex h-57 w-full flex-col justify-start gap-5"
      aria-label="주별 매출 추이"
    >
      <SalesTrendCaption className="absolute top-5.5 left-30" />
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.recentWeeks8_12}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        className="absolute top-5 right-2"
      />
      <div className="pt-2">
        <BarLineChart
          barLineChartSeries={weeklyRevenueTrendData}
          viewBoxWidth={CHART_WIDTH}
          viewBoxHeight={CHART_HEIGHT}
          hasXAxis
          showYGuideLine
          yGuideLineCount={CHART_Y_GUIDE_LINE_COUNT}
          activeTooltip
          tooltipContent={weeklyRevenueTrendTooltipContent}
          xAxisType="right-arrow"
          chartTitle={weeklyRevenueTrendLabel}
          chartDescription="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        />
      </div>
    </DefaultCardWrapper>
  );
};
