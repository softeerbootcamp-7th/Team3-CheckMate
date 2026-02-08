import { ChevronLeft } from 'lucide-react';

import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarPreviousButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const CalendarPreviousButton = ({
  onClick,
  className,
  ariaLabel,
}: CalendarPreviousButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('size-fit', className)}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
};
