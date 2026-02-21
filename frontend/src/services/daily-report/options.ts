import { queryOptions } from '@tanstack/react-query';

import { getDailyReportCalendar, getDailyReportContent } from './get';
import {
  getExistsUnreadNotification,
  getNextClosingTime,
  getNotificationList,
} from './get';
import { dailyReportKeys, notificationKeys } from './keys';

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

export const notificationOptions = {
  list: queryOptions({
    queryKey: notificationKeys.list(),
    queryFn: getNotificationList,
  }),
  existsUnread: queryOptions({
    queryKey: notificationKeys.existsUnread(),
    queryFn: getExistsUnreadNotification,
  }),
  closingTime: queryOptions({
    queryKey: notificationKeys.closingTime(),
    queryFn: getNextClosingTime,
    staleTime: 20 * 60 * 1000, // 20분
  }),
};
