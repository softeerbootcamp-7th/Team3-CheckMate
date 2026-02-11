import { Badge } from '@/components/shared';
import type { Notification } from '@/types/daily-report';
import { formatRelativeTime } from '@/utils/shared';

interface NotificationItemProps {
  notification: Notification;
}
export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <li>
      <p className="text-grey-900 body-small-medium">{notification.message}</p>
      <Badge show={!notification.read} position="right">
        <span className="text-grey-500 caption-large-medium">
          {formatRelativeTime(new Date(notification.date))}
        </span>
      </Badge>
    </li>
  );
};
