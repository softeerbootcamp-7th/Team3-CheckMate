import { queryOptions } from '@tanstack/react-query';

import {
  getExistsUnreadNotification,
  getNextClosingTime,
  getNotificationList,
} from './get';
import { notificationKeys } from './keys';

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
