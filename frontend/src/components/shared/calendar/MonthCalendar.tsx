import { CALENDAR_CONFIG, DATE_RANGE_PICKER_TYPE } from '@/constants/shared';
import { useCalendarNavigation, useMonthCalendar } from '@/hooks/shared';

import { CalendarHeader } from './CalendarHeader';
import { CalendarMonthGrid } from './CalendarMonthGrid';

interface MonthCalendarProps {
  selectedStartDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  selectedEndDate?: Date;
  setSelectedEndDate: (date?: Date) => void;
}

export const MonthCalendar = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}: MonthCalendarProps) => {
  const {
    currentDateForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleMovePreviousYear,
    handleMoveNextYear,
  } = useCalendarNavigation({
    selectedEndDate,
  });
  const { handleSelectMonth } = useMonthCalendar({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  });

  const { headerTitle, previousAriaLabel, nextAriaLabel } =
    CALENDAR_CONFIG[DATE_RANGE_PICKER_TYPE.month];

  return (
    <section className="rounded-300 border-grey-300 w-80 border p-350">
      <div className="size-full">
        <CalendarHeader
          headerTitle={headerTitle(currentDateForCalendar)}
          previousAriaLabel={previousAriaLabel}
          nextAriaLabel={nextAriaLabel}
          handleClickPrevious={handleMovePreviousYear}
          handleClickNext={handleMoveNextYear}
        />
        <CalendarMonthGrid
          currentDateForCalendar={currentDateForCalendar}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          lastWeekOfPreviousMonth={lastWeekOfPreviousMonth}
          numberOfDatesForCalendar={numberOfDatesForCalendar}
          firstWeekOfNextMonth={firstWeekOfNextMonth}
          handleSelectMonth={handleSelectMonth}
        />
      </div>
    </section>
  );
};
