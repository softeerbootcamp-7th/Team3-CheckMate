import { ORDER_COUNT } from '@/constants/menu';
import type { GetDashboardTimeSlotMenuOrderCountResponseDto } from '@/types/menu/dto';
import type { Nullable } from '@/utils/shared';

import { TimeSlotMenuOrderCountContent } from './TimeSlotMenuOrderCountContent';

const { EXAMPLE_TIME_SLOT_2H, EXAMPLE_MENU_NAME } = ORDER_COUNT;
// 현재 주문건수가 가장 많은 메뉴 카드
interface TimeSlotMenuOrderCountCardContentProps extends Nullable<GetDashboardTimeSlotMenuOrderCountResponseDto> {
  className?: string;
}

export const TimeSlotMenuOrderCountCardContent = ({
  timeSlot2H = EXAMPLE_TIME_SLOT_2H,
  menuName = EXAMPLE_MENU_NAME,
}: TimeSlotMenuOrderCountCardContentProps) => {
  return (
    <TimeSlotMenuOrderCountContent
      timeSlot2H={timeSlot2H}
      menuName={menuName}
    />
  );
};
