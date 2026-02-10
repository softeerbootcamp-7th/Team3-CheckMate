import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarYearCellProps {
  year: number;
  onClick?: () => void;
  className?: string;
}

export const CalendarYearCell = ({
  year,
  onClick,
  className,
}: CalendarYearCellProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'body-medium-semibold relative flex h-12 w-full items-center justify-center rounded-none',
        className,
      )}
      onClick={onClick}
    >
      <span className="z-10">{year}</span>
    </Button>
  );
};
