import { BarChart, DefaultCardWrapper } from '@/components/shared';
import { RefreshedTimeButton } from '@/components/shared/refreshed-time-button';
import { MENU_METRIC, MENU_SALES_PATTERN_DETAIL } from '@/constants/menu';
import { useTimeSlotMenuOrderCount } from '@/hooks/menu';

import { useMenuSalesPatternPeriodType } from './period-type-provider';

export const TimeSlotMenuOrderCount = () => {
  const { LABEL_COLOR, CHART_WIDTH, CHART_HEIGHT } =
    MENU_SALES_PATTERN_DETAIL.TIME_SLOT_MENU_ORDER_COUNT;
  const { periodType, startDate, endDate } = useMenuSalesPatternPeriodType();

  const {
    queryKey,
    timeSlotMenuOrderCountData,
    timeSlotMenuOrderCountTooltipContent,
  } = useTimeSlotMenuOrderCount({
    periodType,
    startDate,
    endDate,
  });
  const { label: peakTimeLabel } =
    MENU_METRIC.MENU_SALES_PATTERN.TIME_BASED_MENU_ORDER_COUNT;
  return (
    <DefaultCardWrapper
      className="flex h-[400px] w-full flex-col justify-start gap-5"
      title={peakTimeLabel}
      aria-label={peakTimeLabel}
    >
      <div className="min-w-0 flex-1">
        <BarChart
          viewBoxWidth={CHART_WIDTH}
          viewBoxHeight={CHART_HEIGHT}
          hasXAxis
          hasBarGradient
          xAxisType="default"
          activeTooltip
          chartTitle={`${peakTimeLabel} 차트`}
          chartDescription={`매장이 바쁜 때를 파악해요.`}
          labelOption={{
            textColor: LABEL_COLOR,
          }}
          primarySeries={timeSlotMenuOrderCountData}
          tooltipContent={timeSlotMenuOrderCountTooltipContent}
        />
        <RefreshedTimeButton queryKey={queryKey} />
      </div>
    </DefaultCardWrapper>
  );
};
