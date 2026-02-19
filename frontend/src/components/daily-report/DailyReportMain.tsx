import { useState } from 'react';

import { RevenueCalendar } from '../shared';
import { FetchBoundary } from '../shared/fetch-boundary';

import { DailyReportEmpty } from './daily-report-content/DailyReportEmpty';
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
      <div className="bg-special-card-bg rounded-400 h-176.5 w-162">
        <FetchBoundary
          ErrorFallback={(props) => <DailyReportEmpty {...props} />}
        >
          <DailyReportContent selectedDate={selectedDate} />
        </FetchBoundary>
      </div>
    </div>
  );
};
