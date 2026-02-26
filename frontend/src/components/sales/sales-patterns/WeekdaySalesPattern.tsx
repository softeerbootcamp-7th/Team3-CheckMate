import {
  BarChart,
  DefaultCardWrapper,
  PeriodSelect,
  RefreshedTimeButton,
} from '@/components/shared';
import { SALES_METRIC } from '@/constants/sales';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useWeekdaySalesPattern } from '@/hooks/sales';

import { useWeekdaySalesPatternPeriodType } from './period-type-provider';

export const WeekdaySalesPattern = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useWeekdaySalesPatternPeriodType();

  // 오늘 요일에 해당하는 idx:  월 -> 0, ... 일 -> 6
  const todayWeekDayIdx = (new Date().getDay() + 6) % 7;

  const { label: peakTimeLabel } =
    SALES_METRIC.SALES_PATTERN.WEEKDAY_SALES_PATTERN;

  const {
    queryKey,
    weekdaySalesPatternBarData,
    weekdaySalesPatternLabelData,
    weekdaySalesPatternTooltipContent,
  } = useWeekdaySalesPattern({
    periodType,
    startDate,
    endDate,
  });

  return (
    <DefaultCardWrapper
      className="flex h-70 w-full flex-col justify-start gap-5"
      title={peakTimeLabel}
      aria-label={peakTimeLabel}
    >
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.recent4W}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dateRangePickerType="week"
        className="absolute top-5 right-2"
      />
      <div className="min-h-0 flex-1 pt-2">
        <BarChart
          viewBoxWidth={1020}
          viewBoxHeight={150}
          hasXAxis
          hasBarGradient
          xAxisType="default"
          activeDataIndex={todayWeekDayIdx}
          activeTooltip
          tooltipContent={weekdaySalesPatternTooltipContent}
          chartTitle={`${peakTimeLabel} 차트`}
          chartDescription={`매장이 바쁜 때를 파악해요.`}
          primarySeries={weekdaySalesPatternBarData}
          secondarySeries={weekdaySalesPatternLabelData}
        />
      </div>
      <RefreshedTimeButton queryKey={queryKey} />
    </DefaultCardWrapper>
  );
};
