import { queryOptions } from '@tanstack/react-query';

import { getDailyReportCalendar, getDailyReportContent } from './get';
import { dailyReportKeys } from './keys';

export const dailyReportOptions = {
  content: (date: string) =>
    queryOptions({
      queryKey: dailyReportKeys.content(date),
      queryFn: () => getDailyReportContent({ date }),
    }),
  calendar: (date: Date) =>
    queryOptions({
      queryKey: dailyReportKeys.calendar(
        date.getFullYear(),
        date.getMonth() + 1,
      ),
      queryFn: () =>
        getDailyReportCalendar({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        }),
    }),
} as const;
