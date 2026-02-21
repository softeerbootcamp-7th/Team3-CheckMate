import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_PATTERN_DETAIL } from '@/constants/sales';
import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetDetailPeakTimeResponseDto } from '@/types/sales';
import { createPeakTimeSeries } from '@/utils/sales';
import { formatDateISO } from '@/utils/shared';

interface UsePeakTimeByHourProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.todayOnly>;
  startDate?: Date;
  endDate?: Date;
}

export const usePeakTimeByHour = ({
  periodType,
  startDate,
  endDate,
}: UsePeakTimeByHourProps) => {
  const { cardCodes: peakTimeCardCodes } = SALES_METRIC.SALES_PATTERN.PEAK_TIME;
  const { PRIMARY_COLOR, SECONDARY_COLOR, MAIN_X_UNIT, MAIN_Y_UNIT } =
    SALES_PATTERN_DETAIL.PEAK_TIME_BY_HOUR;

  const { data } = useSuspenseQuery({
    ...salesOptions.peakTimeByHour<GetDetailPeakTimeResponseDto>({
      analysisCardCode: peakTimeCardCodes.today,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  });

  const todaySeries = useMemo(() => {
    const items = [...data.todayItems];
    items.reverse();

    const lastItemNotNullIndex = items.findIndex(
      (item) => item.orderCount !== null,
    );

    const lastItemIndex =
      lastItemNotNullIndex === -1
        ? -1
        : items.length - 1 - lastItemNotNullIndex;

    return {
      ...createPeakTimeSeries(
        data.todayItems.map((item, index) => {
          if (index < lastItemIndex) {
            return {
              ...item,
              orderCount: item.orderCount ?? 0,
            };
          }
          return item;
        }),
        PRIMARY_COLOR,
        MAIN_X_UNIT,
        MAIN_Y_UNIT,
      ),
    };
  }, [data.todayItems, PRIMARY_COLOR, MAIN_X_UNIT, MAIN_Y_UNIT]);

  const weekSeries = useMemo(() => {
    return {
      ...createPeakTimeSeries(
        data.week4Items.map((item) => ({
          ...item,
          orderCount: item.orderCount ?? 0,
        })),
        SECONDARY_COLOR,
        MAIN_X_UNIT,
        MAIN_Y_UNIT,
      ),
    };
  }, [data.week4Items, SECONDARY_COLOR, MAIN_X_UNIT, MAIN_Y_UNIT]);

  return {
    todaySeries,
    weekSeries,
  };
};
