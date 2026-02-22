import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  notificationOptions,
  patchReadNotification,
} from '@/services/daily-report';
import type { Notification } from '@/types/daily-report';

import { NotificationItem } from './NotificationItem';
interface NotificationListProps {
  notifications: Notification[];
}
export const NotificationList = ({ notifications }: NotificationListProps) => {
  const queryClient = useQueryClient();

  const { mutate: readAll } = useMutation({
    mutationFn: patchReadNotification,
    onSettled: () => {
      queryClient.invalidateQueries(notificationOptions.list);
    },
  });

  useEffect(() => {
    return () => {
      // 언마운트 시 읽음 처리
      readAll();
    };
  }, [readAll]);

  return (
    <ul className="flex h-85 flex-col gap-4 overflow-y-auto pb-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={`notification-${notification.notificationId}`}
          notification={notification}
        />
      ))}
    </ul>
  );
};
