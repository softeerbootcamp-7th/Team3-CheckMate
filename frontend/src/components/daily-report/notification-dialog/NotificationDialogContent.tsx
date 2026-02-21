import { useSuspenseQuery } from '@tanstack/react-query';

import { notificationOptions } from '@/services/daily-report';

import { NotificationEmpty } from './NotificationEmpty';
import { NotificationList } from './NotificationList';

export const NotificationDialogContent = () => {
  const { data: notifications } = useSuspenseQuery(notificationOptions.list);

  if (notifications.length === 0) {
    return <NotificationEmpty />;
  }

  return <NotificationList notifications={notifications} />;
};
