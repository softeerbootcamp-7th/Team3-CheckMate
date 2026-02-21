import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_TREND_DETAIL } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesTrendResponseDto } from '@/types/sales';
import { getYearlyRevenueTrendCardCode } from '@/utils/sales';
import { createChartData, formatDateISO } from '@/utils/shared';

interface UseYearlyRevenueTrendProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recentYears3>;
  startDate?: Date;
  endDate?: Date;
}

export const useYearlyRevenueTrend = ({
  periodType,
  startDate,
  endDate,
}: UseYearlyRevenueTrendProps) => {
  const { MAIN_Y_UNIT, SUB_Y_UNIT, X_UNIT, CHART_COLOR } = SALES_TREND_DETAIL;
  const yearlyRevenueTrendCardCode = getYearlyRevenueTrendCardCode(periodType);

  const { data } = useSuspenseQuery(
    salesOptions.yearlyRevenueTrend<GetSalesTrendResponseDto>({
      analysisCardCode: yearlyRevenueTrendCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );

  // 바 그래프용 데이터
  const yearlyRevenueTrendBarData = {
    data: {
      mainX: createChartData(data.items, (item) => item.label, X_UNIT),
      mainY: createChartData(data.items, (item) => item.netAmount, MAIN_Y_UNIT),
    },
    color: CHART_COLOR,
  };
  // 바 그래프 위 서브 레이블용 데이터
  const yearlyRevenueTrendLabelData = {
    data: {
      mainX: createChartData(data.items, (item) => item.label, ''),
      mainY: createChartData(data.items, (item) => item.orderCount, SUB_Y_UNIT),
    },
    color: CHART_COLOR,
  };

  const yearlyRevenueTrendLabel =
    SALES_METRIC.SALES_TREND.YEARLY_SALES_TREND.label;

  return {
    yearlyRevenueTrendLabel,
    yearlyRevenueTrendBarData,
    yearlyRevenueTrendLabelData,
  };
};
