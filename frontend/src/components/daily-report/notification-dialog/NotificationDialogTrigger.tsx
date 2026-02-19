import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BellIcon } from '@/assets/icons';
import { Badge, FetchBoundary } from '@/components/shared';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/shared/shadcn-ui';
import { deleteAllNotifications } from '@/services/daily-report';
import { notificationOptions } from '@/services/daily-report/options';

import { NotificationDialogContent } from './NotificationDialogContent';

export const NotificationDialogTrigger = () => {
  const queryClient = useQueryClient();
  const { data: notifications } = useQuery(notificationOptions.list);

  const mutateDeleteAll = useMutation({
    mutationFn: () => deleteAllNotifications(),
    onSettled: () => {
      queryClient.invalidateQueries(notificationOptions.list);
    },
  });

  const handleDeleteAll = () => {
    mutateDeleteAll.mutate();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-grey-0 rounded-unlimit size-15">
          <Badge show={notifications && notifications.length > 0}>
            <BellIcon className="size-6" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="bg-special-card-bg rounded-300 shadow-card-floating! h-102.5 w-70 translate-x-[-8px] border-none p-4 pt-4.5"
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
        <FetchBoundary>
          <NotificationDialogContent />
        </FetchBoundary>
      </PopoverContent>
    </Popover>
  );
};
