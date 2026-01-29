import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarDateCellProps {
  date: number;
  onClick?: () => void;
  className?: string;
}

export const CalendarDateCell = ({
  date,
  onClick,
  className,
}: CalendarDateCellProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'body-small-semibold relative flex size-10.5 items-center justify-center rounded-none',
        className,
      )}
      onClick={onClick}
    >
      <span className="z-10">{date}</span>
    </Button>
  );
};
