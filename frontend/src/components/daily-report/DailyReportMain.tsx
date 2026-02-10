import { useState } from 'react';

import { RevenueCalendar } from '../shared';

import { DailyReportContent } from './daily-report-content';

export const DailyReportMain = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div className="flex gap-5">
      <div className="h-fit w-96.5">
        <RevenueCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <DailyReportContent selectedDate={selectedDate} />
    </div>
  );
};
