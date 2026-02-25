import { useSuspenseQuery } from '@tanstack/react-query';

import { TimeSlotMenuOrderCountCardContent } from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetDetailTimeSlotMenuOrderCountResponseDto } from '@/types/menu';

type DashboardTimeSlotMenuOrderCountCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.MENU_SALES_PATTERN.items.TIME_BASED_MENU_ORDER_COUNT
>;

interface DashboardTimeSlotMenuOrderCountCardProps {
  cardCode: DashboardTimeSlotMenuOrderCountCardCodes;
}

export const DashboardTimeSlotMenuOrderCountCard = ({
  cardCode,
}: DashboardTimeSlotMenuOrderCountCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetDetailTimeSlotMenuOrderCountResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  const items = [...data.items];
  items.sort((a, b) => b.totalOrderCount - a.totalOrderCount);

  const topItem = items[0];

  const timeSlot2H = topItem?.timeSlot2H;
  const menuName = topItem?.menus[0]?.menuName;

  return (
    <TimeSlotMenuOrderCountCardContent
      timeSlot2H={timeSlot2H}
      menuName={menuName}
    />
  );
};
