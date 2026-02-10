import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface CalendarNextButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}
export const CalendarNextButton = ({
  onClick,
  className,
  ariaLabel,
}: CalendarNextButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('size-fit', className)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ChevronRight className="size-5" />
    </Button>
  );
};
