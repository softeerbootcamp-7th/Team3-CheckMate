import {
  cn,
  getCurrentYear,
  isBetweenSelectedDate,
  isSameYear,
} from '@/utils/shared';

import { CalendarYearCell } from './CalendarYearCell';

interface CalendarYearGridProps {
  currentDateForCalendar: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  handleSelectYear: (currentDate: Date) => void;
}

export const CalendarYearGrid = ({
  currentDateForCalendar,
  selectedStartDate,
  selectedEndDate,
  handleSelectYear,
}: CalendarYearGridProps) => {
  const renderYearCell = ({ year }: { year: number }) => {
    const currentDate = getCurrentYear({
      year,
    });

    const isStart = isSameYear({
      date: currentDate,
      compareDate: selectedStartDate,
    });

    const isEnd = isSameYear({
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
      <CalendarYearCell
        key={year}
        year={year}
        className={cn(
          isSelected &&
            'before:bg-grey-900 before:rounded-unlimit after:bg-grey-100 text-grey-50 before:absolute before:z-2 before:size-full before:content-[""] after:absolute after:z-1 after:h-full after:w-1/2',
          isStart && 'after:right-0',
          isEnd && 'after:left-0',
          isBetweenStartEndDate && 'bg-grey-100',
        )}
        onClick={() => handleSelectYear(currentDate)}
      />
    );
  };
  return (
    <div className="grid grid-cols-2 gap-y-3">
      {Array.from({ length: 10 }).map((_, index) =>
        renderYearCell({ year: currentDateForCalendar.getFullYear() + index }),
      )}
    </div>
  );
};
