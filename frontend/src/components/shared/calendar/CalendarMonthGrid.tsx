import {
  cn,
  getCurrentMonth,
  isBetweenSelectedDate,
  isSameMonth,
} from '@/utils/shared';

import { CalendarMonthCell } from './CalendarMonthCell';

interface CalendarMonthGridProps {
  currentDateForCalendar: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  handleSelectMonth: (currentDate: Date) => void;
}

export const CalendarMonthGrid = ({
  currentDateForCalendar,
  selectedStartDate,
  selectedEndDate,
  handleSelectMonth,
}: CalendarMonthGridProps) => {
  const renderMonthCell = ({ month }: { month: number }) => {
    const currentDate = getCurrentMonth({
      month: month - 1,
      dateForCalendar: currentDateForCalendar,
    });

    const isStart = isSameMonth({
      date: currentDate,
      compareDate: selectedStartDate,
    });

    const isEnd = isSameMonth({
      date: currentDate,
      compareDate: selectedEndDate,
    });

    const isBetweenStartEndDate = isBetweenSelectedDate({
      currentDate,
      selectedStartDate,
      selectedEndDate,
    });

    const isSelected = isStart || isEnd;
    return (
      <CalendarMonthCell
        key={month}
        month={month}
        className={cn(
          isSelected &&
            'before:bg-grey-900 text-grey-50 before:rounded-unlimit after:bg-grey-100 before:absolute before:left-0 before:z-2 before:size-full before:content-[""] after:absolute after:z-1 after:h-full after:w-1/2',
          isStart && 'after:right-0',
          isEnd && 'after:left-0',
          isBetweenStartEndDate && 'bg-grey-100',
        )}
        onClick={() => handleSelectMonth(currentDate)}
      />
    );
  };
  return (
    <div className="grid grid-cols-3 gap-y-3">
      {Array.from({ length: 12 }).map((_, index) =>
        renderMonthCell({ month: index + 1 }),
      )}
    </div>
  );
};
