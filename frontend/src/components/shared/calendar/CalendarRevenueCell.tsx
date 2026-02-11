import { cn, formatNumberInTenThousands } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarRevenueCellProps {
  date: number;
  revenue?: number;
  onClick?: () => void;
  className?: string;
}

export const CalendarRevenueCell = ({
  date,
  revenue,
  onClick,
  className,
}: CalendarRevenueCellProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'body-small-semibold relative flex h-16 w-13 flex-col items-center justify-center gap-0.5 rounded-none',
        className,
      )}
      onClick={onClick}
    >
      <p className="z-10">{date}</p>
      <p
        className={cn(
          'caption-large-medium text-grey-500 z-10',
          revenue === undefined && 'opacity-0',
        )}
      >
        {revenue ? formatNumberInTenThousands(revenue) : '0'}
      </p>
    </Button>
  );
};
