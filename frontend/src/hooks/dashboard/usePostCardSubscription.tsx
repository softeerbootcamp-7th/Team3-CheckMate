import { useMutation } from '@tanstack/react-query';
import { RefreshCcwIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/shadcn-ui';
import { postDashboardSseSubscription } from '@/services/dashboard';

export const usePostCardSubscription = () => {
  const { mutate: subscribeDashboardCardList } = useMutation({
    mutationFn: postDashboardSseSubscription,
    onError: () => {
      toast.error(
        '지표 카드 데이터 연결에 실패했어요. 새로고침 후 다시 시도해주세요.',
        {
          action: (
            <Button
              className="h-fit w-fit"
              onClick={() => {
                window.location.reload();
              }}
              aria-label="새로고침하기"
            >
              <RefreshCcwIcon className="size-4" />
            </Button>
          ),
        },
      );
    },
  });

  return {
    subscribeDashboardCardList,
  };
};
