import { ChevronLeft } from 'lucide-react';

import { Button } from '../shadcn-ui';

interface CalendarPreviousMonthButtonProps {
  onClick: () => void;
}

export const CalendarPreviousMonthButton = ({
  onClick,
}: CalendarPreviousMonthButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-fit"
      onClick={onClick}
      aria-label="이전 달로 이동"
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
};
