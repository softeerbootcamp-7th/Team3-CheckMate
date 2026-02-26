import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MENU_SALES_PATTERN_DETAIL } from '@/constants/menu';
import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetDetailTimeSlotMenuOrderCountResponseDto } from '@/types/menu';
import { getMenuSalesPatternCardCode } from '@/utils/menu';
import {
  createChartData,
  formatDateForDto,
  getHourLabel,
} from '@/utils/shared';
import { createChartDataGroupedBy } from '@/utils/shared';

interface UseTimeSlotMenuOrderCountProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>;
  startDate?: Date;
  endDate?: Date;
}

export const useTimeSlotMenuOrderCount = ({
  periodType,
  startDate,
  endDate,
}: UseTimeSlotMenuOrderCountProps) => {
  const { Y_UNIT, X_UNIT, LABEL_COLOR } =
    MENU_SALES_PATTERN_DETAIL.TIME_SLOT_MENU_ORDER_COUNT;
  const cardCode = getMenuSalesPatternCardCode(periodType);

  const queryOptions =
    menuOptions.timeSlotMenuOrderCount<GetDetailTimeSlotMenuOrderCountResponseDto>(
      {
        analysisCardCode: cardCode,
        customPeriod: !periodType,
        from: formatDateForDto(startDate),
        to: formatDateForDto(endDate),
      },
    );

  // 데이터 가져오기
  const { data } = useSuspenseQuery(queryOptions);

  const timeSlotMenuOrderCountData = useMemo(
    () => ({
      data: {
        mainX: createChartData(
          data.items,
          (item) => getHourLabel(item.timeSlot2H), // 한 자리 시간대는 앞에 0을 붙여서 2자리 + '시'로 표현
          X_UNIT,
        ),
        mainY: createChartDataGroupedBy(
          data.items,
          (item) => item.menus,
          (menu) => menu.orderCount,
          (menu) => menu.menuName,
          Y_UNIT,
          4,
        ),
      },
      color: LABEL_COLOR,
    }),
    [data, X_UNIT, Y_UNIT, LABEL_COLOR],
  );
  const timeSlotMenuOrderCountTooltipContent = (
    label: string, // 메뉴명
    orderCount: string, // 주문 건수
    percentage: string, // 퍼센트
  ) => {
    return `${label}, ${orderCount}건(${percentage})`;
  };

  return {
    queryKey: queryOptions.queryKey,
    timeSlotMenuOrderCountData,
    timeSlotMenuOrderCountTooltipContent,
  };
};
