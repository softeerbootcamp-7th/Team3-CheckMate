import { CalendarCurrentDate } from './CalendarCurrentDate';
import { CalendarNextMonthButton } from './CalendarNextMonthButton';
import { CalendarPreviousMonthButton } from './CalendarPreviousMonthButton';

interface CalendarHeaderProps {
  currentYearForCalendar: number;
  currentMonthForCalendar: number;
  handleClickPreviousMonth: () => void;
  handleClickNextMonth: () => void;
}

export const CalendarHeader = ({
  currentYearForCalendar,
  currentMonthForCalendar,
  handleClickPreviousMonth,
  handleClickNextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-350">
      <CalendarPreviousMonthButton onClick={handleClickPreviousMonth} />
      <CalendarCurrentDate
        currentYearForCalendar={currentYearForCalendar}
        currentMonthForCalendar={currentMonthForCalendar}
      />
      <CalendarNextMonthButton onClick={handleClickNextMonth} />
    </div>
  );
};
