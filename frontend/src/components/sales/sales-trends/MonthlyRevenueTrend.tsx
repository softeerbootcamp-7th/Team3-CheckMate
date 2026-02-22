import {
  BarLineChart,
  DefaultCardWrapper,
  PeriodSelect,
} from '@/components/shared';
import { SALES_TREND_DETAIL } from '@/constants/sales';
import { DATE_RANGE_PICKER_TYPE, PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useMonthlyRevenueTrend } from '@/hooks/sales';

import { useMonthlyRevenueTrendPeriodType } from './period-type-provider';
import { SalesTrendCaption } from './SalesTrendCaption';

export const MonthlyRevenueTrend = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useMonthlyRevenueTrendPeriodType();
  const {
    monthlyRevenueTrendData,
    monthlyRevenueTrendLabel,
    monthlyRevenueTrendTooltipContent,
  } = useMonthlyRevenueTrend({
    periodType,
    startDate,
    endDate,
  });

  const { CHART_WIDTH, CHART_HEIGHT, CHART_Y_GUIDE_LINE_COUNT } =
    SALES_TREND_DETAIL;

  return (
    <DefaultCardWrapper
      title={monthlyRevenueTrendLabel}
      className="flex h-57 w-180 flex-col justify-start gap-5"
      aria-label={monthlyRevenueTrendLabel}
    >
      <SalesTrendCaption className="absolute top-5.5 left-30" />
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.recentMonths6_12}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dateRangePickerType={DATE_RANGE_PICKER_TYPE.month}
        className="absolute top-5 right-2"
      />
      <div className="flex flex-1 pt-2">
        <BarLineChart
          barLineChartSeries={monthlyRevenueTrendData}
          viewBoxWidth={CHART_WIDTH}
          viewBoxHeight={CHART_HEIGHT}
          hasXAxis
          showYGuideLine
          yGuideLineCount={CHART_Y_GUIDE_LINE_COUNT}
          activeTooltip
          tooltipContent={monthlyRevenueTrendTooltipContent}
          xAxisType="right-arrow"
          chartTitle={monthlyRevenueTrendLabel}
          chartDescription="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        />
      </div>
    </DefaultCardWrapper>
  );
};
