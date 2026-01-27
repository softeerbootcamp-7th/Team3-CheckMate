interface CalendarCurrentDateProps {
  currentYearForCalendar: number;
  currentMonthForCalendar: number;
}

export const CalendarCurrentDate = ({
  currentYearForCalendar,
  currentMonthForCalendar,
}: CalendarCurrentDateProps) => {
  return (
    <span className="body-small-bold">
      {currentYearForCalendar}년 {currentMonthForCalendar}월
    </span>
  );
};
