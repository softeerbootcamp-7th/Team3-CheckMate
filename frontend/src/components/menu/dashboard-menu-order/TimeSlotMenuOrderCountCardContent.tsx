import type { GetDashboardTimeSlotMenuOrderCountResponseDto } from '@/types/menu';

import { TimeSlotMenuOrderCountContent } from './TimeSlotMenuOrderCountContent';
import { TimeSlotMenuOrderCountContentEmptyView } from './TimeSlotMenuOrderCountContentEmptyView';

// 현재 주문건수가 가장 많은 메뉴 카드
interface TimeSlotMenuOrderCountCardContentProps extends Partial<GetDashboardTimeSlotMenuOrderCountResponseDto> {
  className?: string;
}

export const TimeSlotMenuOrderCountCardContent = ({
  timeSlot2H,
  menuName,
  className,
}: TimeSlotMenuOrderCountCardContentProps) => {
  if (timeSlot2H === undefined || menuName === undefined) {
    return <TimeSlotMenuOrderCountContentEmptyView />;
  }
  return (
    <TimeSlotMenuOrderCountContent
      timeSlot2H={timeSlot2H}
      menuName={menuName}
      className={className}
    />
  );
};
