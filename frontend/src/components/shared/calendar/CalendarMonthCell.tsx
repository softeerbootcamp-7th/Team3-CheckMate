import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarMonthCellProps {
  month: number;
  onClick?: () => void;
  className?: string;
}

export const CalendarMonthCell = ({
  month,
  onClick,
  className,
}: CalendarMonthCellProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'body-medium-semibold relative flex h-13.5 w-full items-center justify-center rounded-none',
        className,
      )}
      onClick={onClick}
    >
      <span className="z-10">{month}월</span>
    </Button>
  );
};
