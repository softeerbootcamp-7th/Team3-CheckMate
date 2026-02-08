import { CALENDAR_CONFIG, DATE_RANGE_PICKER_TYPE } from '@/constants/shared';
import { useCalendarNavigation, useDateCalendar } from '@/hooks/shared';

import { CalendarDateGrid } from './CalendarDateGrid';
import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarHeader } from './CalendarHeader';

interface DateCalendarProps {
  selectedStartDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  selectedEndDate?: Date;
  setSelectedEndDate: (date?: Date) => void;
}

export const DateCalendar = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}: DateCalendarProps) => {
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

  const { handleSelectDate } = useDateCalendar({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  });

  const { headerTitle, previousAriaLabel, nextAriaLabel } =
    CALENDAR_CONFIG[DATE_RANGE_PICKER_TYPE.date];

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
