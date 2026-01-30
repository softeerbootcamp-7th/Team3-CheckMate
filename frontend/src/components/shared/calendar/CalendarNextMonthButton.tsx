import { ChevronRight } from 'lucide-react';

import { Button } from '../shadcn-ui';

interface CalendarNextMonthButtonProps {
  onClick: () => void;
}
export const CalendarNextMonthButton = ({
  onClick,
}: CalendarNextMonthButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-fit"
      onClick={onClick}
      aria-label="다음 달로 이동"
    >
      <ChevronRight className="size-5" />
    </Button>
  );
};
