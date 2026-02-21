import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_TREND_DETAIL } from '@/constants/sales';
import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesTrendResponseDto } from '@/types/sales';
import { getDailyRevenueTrendCardCode } from '@/utils/sales';
import {
  createChartData,
  formatDateISO,
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
  const { MAIN_Y_UNIT, SUB_Y_UNIT, X_UNIT, CHART_COLOR } = SALES_TREND_DETAIL;
  const dailyRevenueTrendCardCode = getDailyRevenueTrendCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.dailyRevenueTrend<GetSalesTrendResponseDto>({
      analysisCardCode: dailyRevenueTrendCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  });

  const dailyRevenueTrendData = {
    data: {
      mainX: createChartData(
        data.items,
        (item) =>
          periodType === PERIOD_PRESETS.recentDays7_14_30.recent30Days
            ? item.label.replace('월 ', '/').replace('일', '')
            : item.label,
        X_UNIT,
      ),
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
