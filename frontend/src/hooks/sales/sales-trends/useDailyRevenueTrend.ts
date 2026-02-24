import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_TREND_DETAIL } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesTrendResponseDto } from '@/types/sales';
import { getDailyRevenueTrendCardCode } from '@/utils/sales';
import {
  createChartData,
  formatDateForDto,
  formatNumberInTenThousands,
} from '@/utils/shared';

interface UseDailyRevenueTrendProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentDays7_14_30>;
  startDate?: Date;
  endDate?: Date;
}

export const useDailyRevenueTrend = ({
  periodType,
  startDate,
  endDate,
}: UseDailyRevenueTrendProps) => {
  const {
    MAIN_Y_UNIT,
    SUB_Y_UNIT,
    X_UNIT,
    CHART_COLOR,
    DAILY_FORMAT_X_LABEL_CONDITION,
  } = SALES_TREND_DETAIL;
  const dailyRevenueTrendCardCode = getDailyRevenueTrendCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.dailyRevenueTrend<GetSalesTrendResponseDto>({
      analysisCardCode: dailyRevenueTrendCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  });

  const formatXLabel =
    data.items.length >= DAILY_FORMAT_X_LABEL_CONDITION
      ? (item: GetSalesTrendResponseDto['items'][number]) =>
          item.label.replace('월 ', '/').replace('일', '')
      : (item: GetSalesTrendResponseDto['items'][number]) => item.label;

  const dailyRevenueTrendData = {
    data: {
      mainX: createChartData(data.items, formatXLabel, X_UNIT),
      mainY: createChartData(data.items, (item) => item.netAmount, MAIN_Y_UNIT),
      subX: createChartData(data.items, (item) => item.label, ''),
      subY: createChartData(data.items, (item) => item.orderCount, SUB_Y_UNIT),
    },
    color: CHART_COLOR,
  };

  const dailyRevenueTrendLabel =
    SALES_METRIC.SALES_TREND.DAILY_SALES_TREND.label;

  const dailyRevenueTrendTooltipContent = (
    mainY: string,
    mainYUnit: string,
    subY: string,
    subYUnit: string,
  ) => {
    return `${formatNumberInTenThousands(Number(mainY))}${mainYUnit}/${subY}${subYUnit}`;
  };

  return {
    dailyRevenueTrendData,
    dailyRevenueTrendLabel,
    dailyRevenueTrendTooltipContent,
  };
};
