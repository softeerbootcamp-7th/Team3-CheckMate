import { CALENDAR_CONFIG, DATE_RANGE_PICKER_TYPE } from '@/constants/shared';
import { useCalendarNavigation, useWeekCalendar } from '@/hooks/shared';

import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekGrid } from './CalendarWeekGrid';

interface WeekCalendarProps {
  selectedStartDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  selectedEndDate?: Date;
  setSelectedEndDate: (date?: Date) => void;
}

export const WeekCalendar = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}: WeekCalendarProps) => {
  const {
    currentDateForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleMovePreviousMonth,
    handleMoveNextMonth,
  } = useCalendarNavigation({
    selectedEndDate,
  });
  const { handleSelectWeek } = useWeekCalendar({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  });

  const { headerTitle, previousAriaLabel, nextAriaLabel } =
    CALENDAR_CONFIG[DATE_RANGE_PICKER_TYPE.week];

  return (
    <section className="rounded-300 border-grey-300 w-80 border p-350">
      <div className="size-full">
        <CalendarHeader
          headerTitle={headerTitle(currentDateForCalendar)}
          previousAriaLabel={previousAriaLabel}
          nextAriaLabel={nextAriaLabel}
          handleClickPreviousMonth={handleMovePreviousMonth}
          handleClickNextMonth={handleMoveNextMonth}
        />
        <CalendarDayGrid />
        <CalendarWeekGrid
          currentDateForCalendar={currentDateForCalendar}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          lastWeekOfPreviousMonth={lastWeekOfPreviousMonth}
          numberOfDatesForCalendar={numberOfDatesForCalendar}
          firstWeekOfNextMonth={firstWeekOfNextMonth}
          handleSelectWeek={handleSelectWeek}
        />
      </div>
    </section>
  );
};
