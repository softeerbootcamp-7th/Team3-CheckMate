import { queryOptions } from '@tanstack/react-query';

import { getExistsUnreadNotification, getNotificationList } from './get';
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
};
