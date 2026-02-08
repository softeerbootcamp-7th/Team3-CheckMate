import {
  cn,
  getCurrentDate,
  isBetweenSelectedDate,
  isEndDate,
  isStartDate,
} from '@/utils/shared';

import { CalendarDateCell } from './CalendarDateCell';

interface CalendarDateGridProps {
  currentDateForCalendar: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  lastWeekOfPreviousMonth: number[];
  numberOfDatesForCalendar: number;
  firstWeekOfNextMonth: number[];
  handleSelectDate: (currentDate: Date) => void;
}

export const CalendarDateGrid = ({
  currentDateForCalendar,
  selectedStartDate,
  selectedEndDate,
  lastWeekOfPreviousMonth,
  numberOfDatesForCalendar,
  firstWeekOfNextMonth,
  handleSelectDate,
}: CalendarDateGridProps) => {
  const renderDateCell = ({
    date,
    isPreviousMonth,
    isNextMonth,
  }: {
    date: number;
    isPreviousMonth: boolean;
    isNextMonth: boolean;
  }) => {
    const currentDate = getCurrentDate({
      date,
      dateForCalendar: currentDateForCalendar,
      isPreviousMonth,
      isNextMonth,
    });

    const isStart = isStartDate({
      currentDate,
      selectedStartDate,
    });

    const isEnd = isEndDate({
      currentDate,
      selectedEndDate,
    });

    const isSelected = isStart || isEnd;

    const isBetweenStartEndDate = isBetweenSelectedDate({
      currentDate,
      selectedStartDate,
      selectedEndDate,
    });
    return (
      <CalendarDateCell
        key={date}
        date={date}
        className={cn(
          isSelected
            ? 'before:bg-grey-900 text-grey-50 after:bg-grey-100 before:absolute before:inset-0 before:z-2 before:rounded-[5rem] before:content-[""] after:absolute after:z-1 after:h-full after:w-1/2 after:content-[""]'
            : (isPreviousMonth || isNextMonth) && 'text-grey-300',
          isBetweenStartEndDate && 'bg-grey-100',
          isStart && 'after:right-0',
          isEnd && 'after:left-0',
        )}
        onClick={() => handleSelectDate(currentDate)}
      />
    );
  };
  return (
    <div className="grid grid-cols-7">
      {/* 이전 달 */}
      {lastWeekOfPreviousMonth.map((date) =>
        renderDateCell({ date, isPreviousMonth: true, isNextMonth: false }),
      )}

      {/* 현재 달 */}
      {Array.from({ length: numberOfDatesForCalendar }).map((_, index) =>
        renderDateCell({
          date: index + 1,
          isPreviousMonth: false,
          isNextMonth: false,
        }),
      )}

      {/* 다음 달 */}
      {firstWeekOfNextMonth.map((date) =>
        renderDateCell({ date, isPreviousMonth: false, isNextMonth: true }),
      )}
    </div>
  );
};
