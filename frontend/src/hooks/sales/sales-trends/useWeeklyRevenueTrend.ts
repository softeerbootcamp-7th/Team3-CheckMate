import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_TREND_DETAIL } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesTrendResponseDto } from '@/types/sales';
import { getWeeklyRevenueTrendCardCode } from '@/utils/sales';
import {
  createChartData,
  formatDateForDto,
  formatNumberInTenThousands,
} from '@/utils/shared';

interface UseWeeklyRevenueTrendProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentWeeks8_12>;
  startDate?: Date;
  endDate?: Date;
}

export const useWeeklyRevenueTrend = ({
  periodType,
  startDate,
  endDate,
}: UseWeeklyRevenueTrendProps) => {
  const {
    MAIN_Y_UNIT,
    SUB_Y_UNIT,
    X_UNIT,
    CHART_COLOR,
    WEEKLY_FORMAT_X_LABEL_CONDITION,
  } = SALES_TREND_DETAIL;
  const weeklyRevenueTrendCardCode = getWeeklyRevenueTrendCardCode(periodType);
  const queryOptions =
    salesOptions.weeklyRevenueTrend<GetSalesTrendResponseDto>({
      analysisCardCode: weeklyRevenueTrendCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    });

  const { data } = useSuspenseQuery(queryOptions);

  const formatXLabel =
    data.items.length >= WEEKLY_FORMAT_X_LABEL_CONDITION
      ? (item: GetSalesTrendResponseDto['items'][number]) =>
          item.label.replaceAll('월 ', '.').replaceAll('일', '')
      : (item: GetSalesTrendResponseDto['items'][number]) => item.label;

  const weeklyRevenueTrendData = {
    data: {
      mainX: createChartData(data.items, formatXLabel, X_UNIT),
      mainY: createChartData(data.items, (item) => item.netAmount, MAIN_Y_UNIT),
      subX: createChartData(data.items, (item) => item.label, ''),
      subY: createChartData(data.items, (item) => item.orderCount, SUB_Y_UNIT),
    },
    color: CHART_COLOR,
  };

  const weeklyRevenueTrendLabel =
    SALES_METRIC.SALES_TREND.WEEKLY_SALES_TREND.label;

  const weeklyRevenueTrendTooltipContent = (
    mainY: string,
    mainYUnit: string,
    subY: string,
    subYUnit: string,
  ) => {
    return `${formatNumberInTenThousands(Number(mainY))}${mainYUnit}/${subY}${subYUnit}`;
  };

  return {
    queryKey: queryOptions.queryKey,
    weeklyRevenueTrendData,
    weeklyRevenueTrendLabel,
    weeklyRevenueTrendTooltipContent,
  };
};
