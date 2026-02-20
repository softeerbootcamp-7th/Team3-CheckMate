import { useQuery } from '@tanstack/react-query';

import { notificationOptions } from '@/services/daily-report';

import { Badge } from '../badge';

interface DailyReportMenuItemProps {
  menuIcon: React.ReactNode;
}
export const DailyReportMenuItem = ({ menuIcon }: DailyReportMenuItemProps) => {
  const { data: existsUnread } = useQuery({
    ...notificationOptions.existsUnread,
    enabled: false, // 캐시 구독만, fetch하지 않음
  });

  return (
    <Badge show={existsUnread} position="top-left">
      {menuIcon}
    </Badge>
  );
};
