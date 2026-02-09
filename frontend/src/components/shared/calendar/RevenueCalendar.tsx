import { CALENDAR_CONFIG, DATE_RANGE_PICKER_TYPE } from '@/constants/shared';
import { useCalendarNavigation } from '@/hooks/shared';

import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarRevenueGrid } from './CalendarRevenueGrid';

interface RevenueCalendarProps {
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
}

export const RevenueCalendar = ({
  selectedDate,
  setSelectedDate,
}: RevenueCalendarProps) => {
  const {
    currentDateForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleMovePreviousMonth,
    handleMoveNextMonth,
  } = useCalendarNavigation({
    selectedEndDate: selectedDate,
  });

  const handleSelectDate = setSelectedDate;

  const { headerTitle, previousAriaLabel, nextAriaLabel } =
    CALENDAR_CONFIG[DATE_RANGE_PICKER_TYPE.date];

  return (
    <section className="rounded-400 bg-special-card-bg w-fit p-2 pb-4">
      <div className="size-full">
        <CalendarHeader
          headerTitle={headerTitle(currentDateForCalendar)}
          previousAriaLabel={previousAriaLabel}
          nextAriaLabel={nextAriaLabel}
          handleClickPrevious={handleMovePreviousMonth}
          handleClickNext={handleMoveNextMonth}
        />
        <CalendarDayGrid />
        <CalendarRevenueGrid
          currentDateForCalendar={currentDateForCalendar}
          selectedDate={selectedDate}
          lastWeekOfPreviousMonth={lastWeekOfPreviousMonth}
          numberOfDatesForCalendar={numberOfDatesForCalendar}
          firstWeekOfNextMonth={firstWeekOfNextMonth}
          handleSelectDate={handleSelectDate}
        />
      </div>
    </section>
  );
};
