import { Badge } from '@/components/shared';
import type { Notification } from '@/types/daily-report';
import { formatRelativeTime } from '@/utils/shared';

interface NotificationItemProps {
  notification: Notification;
}
export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <li>
      <p className="text-grey-900 body-small-medium">{notification.content}</p>
      <Badge show={!notification.isRead} position="right">
        <span className="text-grey-500 caption-large-medium">
          {formatRelativeTime(new Date(notification.createdAt))}
        </span>
      </Badge>
    </li>
  );
};
