import { CALENDAR_CONFIG, DATE_RANGE_PICKER_TYPE } from '@/constants/shared';
import { useCalendarNavigation, useYearCalendar } from '@/hooks/shared';

import { CalendarHeader } from './CalendarHeader';
import { CalendarYearGrid } from './CalendarYearGrid';

interface YearCalendarProps {
  selectedStartDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  selectedEndDate?: Date;
  setSelectedEndDate: (date?: Date) => void;
}

export const YearCalendar = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}: YearCalendarProps) => {
  const {
    currentDateForCalendar,
    setCurrentDateForCalendar,
    handleMovePrevious10Years,
    handleMoveNext10Years,
  } = useCalendarNavigation({
    selectedEndDate,
  });
  const { handleSelectYear } = useYearCalendar({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  });

  const { headerTitle, previousAriaLabel, nextAriaLabel } =
    CALENDAR_CONFIG[DATE_RANGE_PICKER_TYPE.year];

  if (currentDateForCalendar.getFullYear() % 10 !== 0) {
    const year = Math.floor(currentDateForCalendar.getFullYear() / 10) * 10;
    setCurrentDateForCalendar(new Date(year, 0, 1));
  }

  return (
    <section className="rounded-300 border-grey-300 w-80 border p-350">
      <div className="size-full">
        <CalendarHeader
          headerTitle={headerTitle(currentDateForCalendar)}
          previousAriaLabel={previousAriaLabel}
          nextAriaLabel={nextAriaLabel}
          handleClickPrevious={handleMovePrevious10Years}
          handleClickNext={handleMoveNext10Years}
        />
        <CalendarYearGrid
          currentDateForCalendar={currentDateForCalendar}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          handleSelectYear={handleSelectYear}
        />
      </div>
    </section>
  );
};
