import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_METRIC, SALES_PATTERN_DETAIL } from '@/constants/sales';
import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetDetailSalesByDayResponseDto } from '@/types/sales';
import { createChartData, formatDateISO } from '@/utils/shared';

interface UseWeekdaySalesPatternProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recent4W>;
  startDate?: Date;
  endDate?: Date;
}

export const useWeekdaySalesPattern = ({
  periodType,
  startDate,
  endDate,
}: UseWeekdaySalesPatternProps) => {
  const { cardCodes: weekdaySalesPatternCardCode } =
    SALES_METRIC.SALES_PATTERN.WEEKDAY_SALES_PATTERN;
  const { PRIMARY_COLOR, SECONDARY_COLOR, X_UNIT, MAIN_Y_UNIT, SUB_Y_UNIT } =
    SALES_PATTERN_DETAIL.WEEKDAY_SALES_PATTERN;

  const { data } = useSuspenseQuery(
    salesOptions.weekdaySalesPattern<GetDetailSalesByDayResponseDto>({
      analysisCardCode: weekdaySalesPatternCardCode.recent4Weeks,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );

  // 바그래프에 해당하는 데이터(매출액)
  const weekdaySalesPatternBarData = {
    data: {
      mainX: createChartData(data.items, (item) => item.day, X_UNIT),
      mainY: createChartData(
        data.items,
        (item) => item.avgNetAmount,
        MAIN_Y_UNIT,
      ),
    },
    color: PRIMARY_COLOR,
  };
  // 서브 레이블에 해당하는 데이터(주문 건수)
  const weekdaySalesPatternLabelData = {
    data: {
      mainX: createChartData(data.items, (item) => item.day, ''),
      mainY: createChartData(data.items, (item) => item.orderCount, SUB_Y_UNIT),
    },
    color: SECONDARY_COLOR,
  };
  return { weekdaySalesPatternBarData, weekdaySalesPatternLabelData };
};
