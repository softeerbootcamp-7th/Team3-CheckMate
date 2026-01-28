import { cn } from '@/utils/shared';

interface CalendarDayCellProps {
  text: string;
  index: number;
}

export const CalendarDayCell = ({ text, index }: CalendarDayCellProps) => {
  return (
    <div
      className={cn(
        'caption-large-semibold flex size-10.5 items-center justify-center',
        index === 5 && 'text-brand-main',
        index === 6 && 'text-others-negative',
      )}
    >
      {text}
    </div>
  );
};
