import { DateCalendar } from '@/components/shared';

interface DailyReportCalendarProps {
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
}
export const DailyReportCalendar = ({
  selectedDate,
  setSelectedDate,
}: DailyReportCalendarProps) => {
  return (
    <div className="bg-special-card-bg h-fit">
      {/* 임시 캘린더 */}
      <DateCalendar
        selectedStartDate={selectedDate ?? new Date()}
        selectedEndDate={selectedDate ?? new Date()}
        setSelectedStartDate={setSelectedDate}
        setSelectedEndDate={setSelectedDate}
      />
    </div>
  );
};
