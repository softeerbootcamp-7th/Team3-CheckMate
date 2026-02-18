import { queryOptions } from '@tanstack/react-query';

import { getDailyReportCalendar, getDailyReportContent } from './get';
import { dailyReportKeys } from './keys';

export const dailyReportOptions = {
  content: (date: string) =>
    queryOptions({
      queryKey: dailyReportKeys.content(date),
      queryFn: () => getDailyReportContent({ date }),
    }),
  calendar: (year: number, month: number) =>
    queryOptions({
      queryKey: dailyReportKeys.calendar(year, month),
      queryFn: () => getDailyReportCalendar({ year, month }),
    }),
} as const;
