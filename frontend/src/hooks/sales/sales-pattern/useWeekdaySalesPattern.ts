import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_PATTERN_DETAIL } from '@/constants/sales';
import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetDetailSalesByDayResponseDto } from '@/types/sales';
import { getWeekdaySalesPatternCardCode } from '@/utils/sales';
import {
  createChartData,
  formatDateISO,
  formatPriceWithComma,
} from '@/utils/shared';

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
  const { PRIMARY_COLOR, SECONDARY_COLOR, X_UNIT, MAIN_Y_UNIT, SUB_Y_UNIT } =
    SALES_PATTERN_DETAIL.WEEKDAY_SALES_PATTERN;

  const weekdaySalesPatternCardCode =
    getWeekdaySalesPatternCardCode(periodType);

  const { data } = useSuspenseQuery(
    salesOptions.weekdaySalesPattern<GetDetailSalesByDayResponseDto>({
      analysisCardCode: weekdaySalesPatternCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );

  // 바그래프에 해당하는 데이터(매출액)
  const weekdaySalesPatternBarData = useMemo(
    () => ({
      data: {
        mainX: createChartData(data.items, (item) => item.day, X_UNIT),
        mainY: createChartData(
          data.items,
          (item) => item.avgNetAmount,
          MAIN_Y_UNIT,
        ),
      },
      color: PRIMARY_COLOR,
    }),
    [data.items, X_UNIT, MAIN_Y_UNIT, PRIMARY_COLOR],
  );
  // 서브 레이블에 해당하는 데이터(주문 건수)
  const weekdaySalesPatternLabelData = useMemo(
    () => ({
      data: {
        mainX: createChartData(data.items, (item) => item.day, ''),
        mainY: createChartData(
          data.items,
          (item) => item.orderCount,
          SUB_Y_UNIT,
        ),
      },
      color: SECONDARY_COLOR,
    }),
    [data.items, SUB_Y_UNIT, SECONDARY_COLOR],
  );

  // 툴팁에 상세 가격 화폐 단위로 보여주기 위한 함수
  const weekdaySalesPatternTooltipContent = (
    mainY: string,
    mainYUnit: string,
  ) => {
    return `${formatPriceWithComma(Number(mainY)).split('.')[0]}}${mainYUnit}`;
  };
  return {
    weekdaySalesPatternBarData,
    weekdaySalesPatternLabelData,
    weekdaySalesPatternTooltipContent,
  };
};
