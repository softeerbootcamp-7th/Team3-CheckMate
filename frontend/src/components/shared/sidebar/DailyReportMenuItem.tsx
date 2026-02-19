import { useQuery } from '@tanstack/react-query';

import { notificationOptions } from '@/services/daily-report';

import { Badge } from '../badge';

interface DailyReportMenuItemProps {
  menuIcon: React.ReactNode;
}
export const DailyReportMenuItem = ({ menuIcon }: DailyReportMenuItemProps) => {
  const { data: existsUnread } = useQuery(notificationOptions.existsUnread);

  return (
    <Badge show={existsUnread} position="top-left">
      {menuIcon}
    </Badge>
  );
};
