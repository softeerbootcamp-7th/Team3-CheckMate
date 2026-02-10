import type { Notification } from '@/types/daily-report';

import { NotificationItem } from './NotificationItem';
interface NotificationListProps {
  notifications: Notification[];
}
export const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <ul className="mt-4 flex h-85 flex-col gap-4 overflow-y-scroll">
      {notifications.map((notification, index) => (
        // key는 index로 임시 설정
        <NotificationItem key={index} notification={notification} />
      ))}
    </ul>
  );
};
