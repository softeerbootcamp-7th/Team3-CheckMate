import { useSuspenseQuery } from '@tanstack/react-query';

import { TimeSlotMenuOrderCountCardContent } from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetDashboardTimeSlotMenuOrderCountResponseDto } from '@/types/menu';

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
    createCardDetailQuery<GetDashboardTimeSlotMenuOrderCountResponseDto>(
      cardCode,
    );

  const { data } = useSuspenseQuery(queryOption);

  return (
    <TimeSlotMenuOrderCountCardContent
      timeSlot2H={data.timeSlot2H}
      menuName={data.menuName}
    />
  );
};
