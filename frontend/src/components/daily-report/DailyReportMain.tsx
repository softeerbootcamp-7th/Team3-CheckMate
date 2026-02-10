import { useState } from 'react';

import { DailyReportContent } from './daily-report-content';
import { DailyReportCalendar } from './DailyReportCalendar';

export const DailyReportMain = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div className="flex gap-5">
      <DailyReportCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DailyReportContent selectedDate={selectedDate} />
    </div>
  );
};
