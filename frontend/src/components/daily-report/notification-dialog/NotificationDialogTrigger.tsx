import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
import {
  deleteAllNotifications,
  notificationOptions,
} from '@/services/daily-report';

import { NotificationDialogContent } from './NotificationDialogContent';

export const NotificationDialogTrigger = () => {
  const queryClient = useQueryClient();
  const { data: existsUnread } = useQuery(notificationOptions.existsUnread);

  const mutateDeleteAll = useMutation({
    mutationFn: () => deleteAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries(notificationOptions.list);
    },
    onError: (error) => {
      toast.error(
        error.message || '알림이 삭제되지 않았어요. 다시 시도해주세요.',
      );
    },
  });

  const handleDeleteAll = () => {
    mutateDeleteAll.mutate();
  };

  const handlePrefetchNotificationList = () => {
    queryClient.prefetchQuery(notificationOptions.list);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="bg-grey-0 rounded-unlimit size-15"
          onMouseEnter={handlePrefetchNotificationList}
        >
          <Badge show={existsUnread}>
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
