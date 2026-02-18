import { cn, getNextHour } from '@/utils/shared';

interface TimeSlotMenuOrderCountContentProps {
  className?: string;
  timeSlot2H: number;
  menuName: string;
}
// 현재 주문건수가 가장 많은 메뉴 카드
export const TimeSlotMenuOrderCountContent = ({
  className,
  timeSlot2H,
  menuName,
}: TimeSlotMenuOrderCountContentProps) => {
  return (
    <p
      className={cn(
        'title-large-semibold text-grey-900 flex h-34 w-75 flex-col justify-end',
        className,
      )}
    >
      <span className="title-large-bold text-brand-main flex w-70">
        <span className="min-w-0 truncate">{menuName}</span>
        <span className="shrink-0">{`는 ${timeSlot2H}~${getNextHour(timeSlot2H)}시`}</span>
      </span>
      <span>주문이 가장 많아요</span>
    </p>
  );
};
