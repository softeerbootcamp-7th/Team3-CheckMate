import { useState } from 'react';

import { BellIcon } from '@/assets/icons';
import { Badge } from '@/components/shared';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/shared/shadcn-ui';
import { NOTIFICATION_DATA } from '@/mocks/data/daily-report';

import { NotificationEmpty } from './NotificationEmpty';
import { NotificationList } from './NotificationList';

export const NotificationDialogTrigger = () => {
  const [notifications, setNotifications] = useState(NOTIFICATION_DATA); // 더미 데이터

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-grey-0 rounded-unlimit size-15">
          <Badge show={notifications.length > 0}>
            <BellIcon className="size-6" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="bg-special-card-bg rounded-300 shadow-card-floating! w-70 translate-x-[-8px] border-none p-4 pt-4.5"
      >
        <PopoverHeader className="flex justify-between">
          <PopoverTitle className="body-small-medium text-grey-900 w-fit">
            알림
          </PopoverTitle>
          <Button
            className="text-grey-500 caption-large-medium! absolute top-2 right-0"
            onClick={handleDeleteAll}
          >
            전체삭제
          </Button>
        </PopoverHeader>
        {notifications.length > 0 ? (
          <NotificationList notifications={notifications} />
        ) : (
          <NotificationEmpty />
        )}
      </PopoverContent>
    </Popover>
  );
};
