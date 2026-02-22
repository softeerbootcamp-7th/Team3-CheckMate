import { BarChart } from '@/components/shared';
import { DefaultCardWrapper, PeriodSelect } from '@/components/shared';
import { DATE_RANGE_PICKER_TYPE, PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useYearlyRevenueTrend } from '@/hooks/sales';

import { useYearlyRevenueTrendPeriodType } from './period-type-provider';

export const YearlyRevenueTrend = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useYearlyRevenueTrendPeriodType();
  const {
    yearlyRevenueTrendLabel,
    yearlyRevenueTrendBarData,
    yearlyRevenueTrendLabelData,
    yearlyRevenueTrendTooltipContent,
  } = useYearlyRevenueTrend({
    periodType,
    startDate,
    endDate,
  });

  return (
    <DefaultCardWrapper
      title={yearlyRevenueTrendLabel}
      className="flex h-57 w-85 flex-col justify-start gap-5"
      aria-label={yearlyRevenueTrendLabel}
    >
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.recentYears3}
        periodType={periodType}
        setPeriodType={setPeriodType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dateRangePickerType={DATE_RANGE_PICKER_TYPE.year}
        className="absolute top-5 right-2 max-w-48 overflow-x-auto pb-2" // 년도 커스텀 선택 시 가로 넓어짐 -> 스크롤바 생성되어서 튀어나가지 않도록
      />
      <div className="pt-2">
        <BarChart
          primarySeries={yearlyRevenueTrendBarData}
          secondarySeries={yearlyRevenueTrendLabelData}
          viewBoxWidth={300}
          viewBoxHeight={140}
          hasXAxis
          showYGuideLine={false}
          activeTooltip
          xAxisType="right-arrow"
          hasBarGradient
          showBarLabel
          showSubBarLabel
          tooltipContent={yearlyRevenueTrendTooltipContent}
          chartTitle={yearlyRevenueTrendLabel}
          chartDescription="매출이 늘고 있는지, 줄고 있는지 흐름으로 살펴봐요."
        />
      </div>
    </DefaultCardWrapper>
  );
};
