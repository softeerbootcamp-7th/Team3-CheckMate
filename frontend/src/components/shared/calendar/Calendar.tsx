import { useCalendar } from '@/hooks/shared';

import { CalendarDateGrid } from './CalendarDateGrid';
import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
  selectedStartDate?: Date;
  setSelectedStartDate: (date: Date) => void;
  selectedEndDate?: Date;
  setSelectedEndDate: (date: Date) => void;
}

export const Calendar = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}: CalendarProps) => {
  const {
    currentDateForCalendar,
    currentYearForCalendar,
    currentMonthForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleClickPreviousMonth,
    handleClickNextMonth,
    handleSelectDate,
  } = useCalendar({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  });

  return (
    <section className="rounded-300 border-grey-300 w-80 border p-350">
      <div className="size-full">
        <CalendarHeader
          currentYearForCalendar={currentYearForCalendar}
          currentMonthForCalendar={currentMonthForCalendar}
          handleClickPreviousMonth={handleClickPreviousMonth}
          handleClickNextMonth={handleClickNextMonth}
        />
        <CalendarDayGrid />
        <CalendarDateGrid
          currentDateForCalendar={currentDateForCalendar}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          lastWeekOfPreviousMonth={lastWeekOfPreviousMonth}
          numberOfDatesForCalendar={numberOfDatesForCalendar}
          firstWeekOfNextMonth={firstWeekOfNextMonth}
          handleSelectDate={handleSelectDate}
        />
      </div>
    </section>
  );
};
