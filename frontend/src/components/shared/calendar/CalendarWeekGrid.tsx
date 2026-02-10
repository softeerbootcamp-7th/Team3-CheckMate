import {
  cn,
  getCurrentDate,
  getSundayOfWeek,
  isBetweenSelectedDate,
  isEndDate,
  isStartDate,
} from '@/utils/shared';

import { CalendarDateCell } from './CalendarDateCell';

interface CalendarWeekGridProps {
  currentDateForCalendar: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  lastWeekOfPreviousMonth: number[];
  numberOfDatesForCalendar: number;
  firstWeekOfNextMonth: number[];
  handleSelectWeek: (currentDate: Date) => void;
}

export const CalendarWeekGrid = ({
  currentDateForCalendar,
  selectedStartDate,
  selectedEndDate,
  lastWeekOfPreviousMonth,
  numberOfDatesForCalendar,
  firstWeekOfNextMonth,
  handleSelectWeek,
}: CalendarWeekGridProps) => {
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

    const sundayOfStartDate = getSundayOfWeek(selectedStartDate);
    const isOnlyStartDateSelected = selectedStartDate && !selectedEndDate;

    const isStart = isStartDate({
      currentDate,
      selectedStartDate,
    });

    const isEnd = isEndDate({
      currentDate,
      selectedEndDate: isOnlyStartDateSelected
        ? sundayOfStartDate
        : selectedEndDate,
    });

    const isBetweenStartEndDate = isBetweenSelectedDate({
      currentDate,
      selectedStartDate,
      selectedEndDate: isOnlyStartDateSelected
        ? sundayOfStartDate
        : selectedEndDate,
    });

    return (
      <CalendarDateCell
        key={date}
        date={date}
        className={cn(
          (isPreviousMonth || isNextMonth) && 'text-grey-300',
          (isStart || isEnd) &&
            'before:bg-grey-900 text-grey-900 bg-grey-100 before:absolute before:h-full before:w-1.5 before:content-[""]',
          isStart && 'before:left-[-6px] before:rounded-l-[5px]',
          isEnd && 'before:right-[-6px] before:rounded-r-[5px]',
          isBetweenStartEndDate && 'bg-grey-100',
        )}
        onClick={() => handleSelectWeek(currentDate)}
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
