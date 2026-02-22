import { useMemo } from 'react';

import { LineChart } from '@/components/shared';
import { DAY_OF_WEEK_LIST } from '@/constants/shared';
import type { GetDetailPeakTimeResponseDto } from '@/types/sales';
import {
  createPeakTimeSeries,
  getSalesPatternPeakTimeMessage,
} from '@/utils/sales';
import { cn } from '@/utils/shared';

import { PeakTimeChartCaption } from './PeakTimeChartCaption';

interface PeakTimeContentProps {
  peakTimeData: GetDetailPeakTimeResponseDto;
  className?: string;
  disableCaption?: boolean;
}

export const PeakTimeContent = ({
  peakTimeData,
  className,
  disableCaption = false,
}: PeakTimeContentProps) => {
  const weekday = DAY_OF_WEEK_LIST[(new Date().getDay() + 6) % 7];

  const {
    todayItems,
    week4Items,
    todayPeak,
    comparisonPeak,
    beforeComparisonPeak,
  } = peakTimeData;

  const peakTimeBriefingMessage = getSalesPatternPeakTimeMessage({
    todayPeak,
    comparisonPeak,
    beforeComparisonPeak,
  });

  const primarySeries = useMemo(() => {
    const lastItemIndexNotNull = [...todayItems]
      .reverse()
      .findIndex((item) => item.orderCount !== null);
    const lastItemIndex =
      lastItemIndexNotNull === -1
        ? -1
        : todayItems.length - lastItemIndexNotNull - 1;

    return {
      ...createPeakTimeSeries(
        todayItems.map((item, index) => {
          if (index < lastItemIndex) {
            return {
              ...item,
              orderCount: item.orderCount ?? 0,
            };
          }
          return item;
        }),
        'var(--color-brand-main)',
      ),
    };
  }, [todayItems]);

  const secondarySeries = useMemo(() => {
    return {
      ...createPeakTimeSeries(
        week4Items.map((item) => ({
          ...item,
          orderCount: item.orderCount ?? 0,
        })),
        'var(--color-grey-400)',
      ),
    };
  }, [week4Items]);

  return (
    <article
      className={cn(
        '-mt-1 flex w-75 flex-col items-start justify-start gap-1',
        className,
      )}
    >
      {!disableCaption && (
        <div className="absolute top-5.5 left-26 flex items-center gap-1.5">
          <PeakTimeChartCaption label="실시간" color="primary" />
          <PeakTimeChartCaption
            label={`${weekday}요일 평균(4주)`}
            color="default"
          />
        </div>
      )}
      <div className="mb-1 h-22.5 w-75">
        <LineChart
          viewBoxWidth={260}
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
      <p className="body-large-semibold">
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
