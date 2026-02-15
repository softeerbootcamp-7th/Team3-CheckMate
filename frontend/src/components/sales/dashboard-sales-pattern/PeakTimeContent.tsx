import { useMemo } from 'react';

import { LineChart } from '@/components/shared';
import { DAY_OF_WEEK_LIST } from '@/constants/shared';
import type { GetDetailPeakTimeResponseDto } from '@/types/sales';
import {
  createPeakTimeSeries,
  getSalesPatternPeaktimeMessage,
} from '@/utils/sales';
import { cn } from '@/utils/shared';

import { PeakTimeChartCaption } from './PeakTimeChartCaption';

interface PeakTimeContentProps {
  peakTimeData: GetDetailPeakTimeResponseDto;
  className?: string;
}

export const PeakTimeContent = ({
  peakTimeData,
  className,
}: PeakTimeContentProps) => {
  const weekday = DAY_OF_WEEK_LIST[new Date().getDay()];

  const {
    todayItems,
    week4Items,
    todayPeak,
    comparisonPeak,
    beforeComparisonPeak,
  } = peakTimeData;

  const peakTimeBriefingMessage = getSalesPatternPeaktimeMessage({
    todayPeak,
    comparisonPeak,
    beforeComparisonPeak,
  });

  const primarySeries = useMemo(() => {
    return {
      ...createPeakTimeSeries(todayItems, 'var(--color-brand-main)'),
    };
  }, [todayItems]);

  const secondarySeries = useMemo(() => {
    return {
      ...createPeakTimeSeries(week4Items, 'var(--color-grey-400)'),
    };
  }, [week4Items]);

  return (
    <article
      className={cn(
        'flex w-75 flex-col items-start justify-start gap-1',
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <PeakTimeChartCaption label="실시간" color="primary" />
        <PeakTimeChartCaption
          label={`${weekday}요일 평균(4주)`}
          color="default"
        />
      </div>
      <div className="h-22.5 w-75">
        <LineChart
          viewBoxWidth={300}
          viewBoxHeight={90}
          hasXAxis={false}
          hasGradient
          yGuideLineCount={4}
          showXGuideLine={false}
          showYGuideLine
          primarySeries={primarySeries}
          secondarySeries={secondarySeries}
          xAxisType="default"
        />
      </div>
      <p className="title-large-semibold">
        {peakTimeBriefingMessage.map(
          ({ text, isHighlight, highlightColor }, index) => {
            return (
              <span
                key={index}
                className={cn(
                  'text-grey-900 break-keep whitespace-pre-wrap',
                  isHighlight && highlightColor,
                )}
              >
                {text}
              </span>
            );
          },
        )}
      </p>
    </article>
  );
};
