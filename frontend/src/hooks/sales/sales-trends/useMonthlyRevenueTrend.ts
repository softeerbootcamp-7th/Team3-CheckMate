import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_TREND_DETAIL } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesTrendResponseDto } from '@/types/sales';
import { getMonthlyRevenueTrendCardCode } from '@/utils/sales';
import { createChartData, formatNumberInTenThousands } from '@/utils/shared';

interface UseMonthlyRevenueTrendProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentMonths6_12>;
  startDate?: Date;
  endDate?: Date;
}

export const useMonthlyRevenueTrend = ({
  periodType,
  startDate,
  endDate,
}: UseMonthlyRevenueTrendProps) => {
  const { MAIN_Y_UNIT, SUB_Y_UNIT, X_UNIT, CHART_COLOR } = SALES_TREND_DETAIL;
  const monthlyRevenueTrendCardCode =
    getMonthlyRevenueTrendCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.monthlyRevenueTrend<GetSalesTrendResponseDto>({
      analysisCardCode: monthlyRevenueTrendCardCode,
      customPeriod: !periodType,
      from: startDate?.toISOString(),
      to: endDate?.toISOString(),
    }),
  });

  const monthlyRevenueTrendData = {
    data: {
      mainX: createChartData(data.items, (item) => item.label, X_UNIT),
      mainY: createChartData(data.items, (item) => item.netAmount, MAIN_Y_UNIT),
      subX: createChartData(data.items, (item) => item.label, ''),
      subY: createChartData(data.items, (item) => item.orderCount, SUB_Y_UNIT),
    },
    color: CHART_COLOR,
  };

  const monthlyRevenueTrendLabel =
    SALES_METRIC.SALES_TREND.MONTHLY_SALES_TREND.label;

  const monthlyRevenueTrendTooltipContent = (
    mainY: string,
    mainYUnit: string,
    subY: string,
    subYUnit: string,
  ) => {
    return `${formatNumberInTenThousands(Number(mainY))}${mainYUnit}/${subY}${subYUnit}`;
  };

  return {
    monthlyRevenueTrendData,
    monthlyRevenueTrendLabel,
    monthlyRevenueTrendTooltipContent,
  };
};
