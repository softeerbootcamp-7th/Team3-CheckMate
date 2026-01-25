import { cn, isBetweenSelectedDate, isSelectedDate } from '@/utils/shared';

import { CalendarDateCell } from './Calendar.date-cell';

interface CalendarDateGridProps {
  currentDateForCalendar: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  lastWeekOfPreviousMonth: number[];
  numberOfDatesForCalendar: number;
  firstWeekOfNextMonth: number[];
  handleSelectDate: ({
    date,
    isPreviousMonth,
    isNextMonth,
  }: {
    date: number;
    isPreviousMonth: boolean;
    isNextMonth: boolean;
  }) => void;
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
    const currentDate = new Date(
      currentDateForCalendar.getFullYear(),
      currentDateForCalendar.getMonth() +
        (isPreviousMonth ? -1 : 0) +
        (isNextMonth ? 1 : 0),
      date,
    );

    const isSelected = isSelectedDate({
      currentDate,
      selectedStartDate,
      selectedEndDate,
    });
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
            ? 'bg-grey-900 text-grey-50 rounded-[5rem]'
            : (isPreviousMonth || isNextMonth) && 'text-grey-300',
          isBetweenStartEndDate && 'bg-grey-100',
        )}
        onClick={() =>
          handleSelectDate({
            date,
            isPreviousMonth,
            isNextMonth,
          })
        }
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
