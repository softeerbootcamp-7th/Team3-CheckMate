import { queryOptions } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/constants/shared';

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
      ...QUERY_CACHE.IMMUTABLE, // 데일리 리포트는 내용이 변하지 않음
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
      ...QUERY_CACHE.IMMUTABLE, // 월별 매출 내역도 내용 변하지 않음. 단 데일리 리포트 발행 되었을 땐 명시적으로 invalidate 해줘야함
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
