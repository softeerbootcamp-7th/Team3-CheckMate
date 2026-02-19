import { useQuery } from '@tanstack/react-query';

import { dailyReportOptions } from '@/services/daily-report/options';
import { cn, getCurrentDate, isSameDate } from '@/utils/shared';

import { CalendarRevenueCell } from './CalendarRevenueCell';

interface CalendarRevenueGridProps {
  currentDateForCalendar: Date;
  selectedDate?: Date;
  lastWeekOfPreviousMonth: number[];
  numberOfDatesForCalendar: number;
  firstWeekOfNextMonth: number[];
  handleSelectDate: (currentDate: Date) => void;
}

export const CalendarRevenueGrid = ({
  currentDateForCalendar,
  selectedDate,
  lastWeekOfPreviousMonth,
  numberOfDatesForCalendar,
  firstWeekOfNextMonth,
  handleSelectDate,
}: CalendarRevenueGridProps) => {
  const year = currentDateForCalendar.getFullYear();
  const month = currentDateForCalendar.getMonth() + 1;
  const { data: calendarData } = useQuery(
    dailyReportOptions.calendar(year, month),
  );

  const renderDateCell = ({
    date,
    isPreviousMonth,
    isNextMonth,
  }: {
    date: number;
    revenue?: number;
    isPreviousMonth: boolean;
    isNextMonth: boolean;
  }) => {
    const currentDate = getCurrentDate({
      date,
      dateForCalendar: currentDateForCalendar,
      isPreviousMonth,
      isNextMonth,
    });

    const isSelected = isSameDate({
      currentDate,
      selectedDate,
    });

    return (
      <CalendarRevenueCell
        key={
          isPreviousMonth
            ? `prev-${date}`
            : isNextMonth
              ? `next-${date}`
              : `curr-${date}`
        }
        date={date}
        revenue={
          calendarData?.monthlySales.find(
            (item) => item.date === currentDate.toISOString().slice(0, 10),
          )?.netSales
        }
        className={cn(
          isSelected &&
            'before:bg-grey-900 text-grey-50 before:absolute before:z-2 before:size-6 before:-translate-y-2.5 before:rounded-full before:content-[""]',
          (isPreviousMonth || isNextMonth) && 'text-grey-300',
        )}
        onClick={() => handleSelectDate(currentDate)}
      />
    );
  };
  return (
    <div className="grid grid-cols-7 gap-px">
      {/* 이전 달 */}
      {lastWeekOfPreviousMonth.map((date) =>
        renderDateCell({
          date,
          isPreviousMonth: true,
          isNextMonth: false,
        }),
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
        renderDateCell({
          date,
          isPreviousMonth: false,
          isNextMonth: true,
        }),
      )}
    </div>
  );
};
