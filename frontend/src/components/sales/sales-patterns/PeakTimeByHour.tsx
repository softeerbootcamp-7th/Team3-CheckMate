import {
  DefaultCardWrapper,
  LineChart,
  PeriodSelect,
  RefreshedTimeButton,
} from '@/components/shared';
import { SALES_METRIC } from '@/constants/sales';
import { DAY_OF_WEEK_LIST, PERIOD_PRESET_KEYS } from '@/constants/shared';
import { usePeakTimeByHour } from '@/hooks/sales';

import { PeakTimeChartCaption } from '../dashboard-sales-pattern';

import { usePeakTimeByHourPeriodType } from './period-type-provider';

export const PeakTimeByHour = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePeakTimeByHourPeriodType();

  const weekday = DAY_OF_WEEK_LIST[(new Date().getDay() + 6) % 7];

  const { label: peakTimeLabel } = SALES_METRIC.SALES_PATTERN.PEAK_TIME;

  const { queryKey, todaySeries, weekSeries } = usePeakTimeByHour({
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
      <div className="absolute top-5.5 left-55.5 flex items-center gap-1.5">
        <PeakTimeChartCaption label="실시간" color="primary" />
        <PeakTimeChartCaption
          label={`${weekday}요일 평균(4주)`}
          color="default"
        />
      </div>
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.todayOnly}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        className="absolute top-5 right-2"
      />
      <div className="min-h-0 flex-1 pt-2">
        <LineChart
          viewBoxWidth={1020}
          viewBoxHeight={150}
          hasXAxis
          hasGradient
          yGuideLineCount={4}
          showYGuideLine
          xAxisType="tick"
          activeTooltip
          tooltipContent={(mainY, subY) => `${mainY} ${subY}`}
          chartTitle={`${peakTimeLabel} 차트`}
          chartDescription={`매장이 바쁜 때를 파악해요.`}
          primarySeries={todaySeries}
          secondarySeries={weekSeries}
        />
      </div>
      <RefreshedTimeButton queryKey={queryKey} />
    </DefaultCardWrapper>
  );
};
