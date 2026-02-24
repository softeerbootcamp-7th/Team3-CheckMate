import { useState } from 'react';

import { useClearDailyReportAndCalenderCache } from '@/hooks/daily-report';
import { cn } from '@/utils/shared';

import { FetchBoundary, RevenueCalendar } from '../shared';

import { DailyReportContent } from './daily-report-content';

export const DailyReportMain = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  // 데일리 리포트 페이지 나갈 때 데일리 리포트 관련 캐시 분량 확인하고 너무 많으면 오늘 데이터 제외 초기화
  useClearDailyReportAndCalenderCache();

  return (
    <div className="flex gap-5">
      <div className="h-fit w-96.5">
        <RevenueCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div
        className={cn(
          'bg-special-card-bg rounded-400 relative h-176.5 w-162',
          "after:from-special-card-bg after:absolute after:bottom-0 after:left-0 after:h-12 after:w-full after:bg-linear-to-t after:from-30% after:to-transparent after:content-['']",
        )}
      >
        <FetchBoundary>
          <DailyReportContent selectedDate={selectedDate} />
        </FetchBoundary>
      </div>
    </div>
  );
};
