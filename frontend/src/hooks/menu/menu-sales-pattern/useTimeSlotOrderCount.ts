import { useSuspenseQuery } from '@tanstack/react-query';

import { MENU_SALES_PATTERN_DETAIL } from '@/constants/menu';
import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetDetailTimeSlotMenuOrderCountResponseDto } from '@/types/menu';
import { getMenuSalesPatternCardCode } from '@/utils/menu';
import { createChartData, formatDateISO, getHourLabel } from '@/utils/shared';
import { createChartDataGroupedBy } from '@/utils/shared/chart';

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

  // 데이터 가져오기
  const { data } = useSuspenseQuery(
    menuOptions.timeSlotMenuOrderCount<GetDetailTimeSlotMenuOrderCountResponseDto>(
      {
        analysisCardCode: cardCode,
        customPeriod: !periodType,
        from: startDate ? formatDateISO(startDate) : undefined,
        to: endDate ? formatDateISO(endDate) : undefined,
      },
    ),
  );

  const timeSlotMenuOrderCountData = {
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
      ),
    },
    color: LABEL_COLOR,
  };

  return { timeSlotMenuOrderCountData };
};
