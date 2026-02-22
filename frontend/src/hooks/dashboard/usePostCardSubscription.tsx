import { useCallback, useEffect, useRef } from 'react';

import { useMutation } from '@tanstack/react-query';
import { RefreshCcwIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/shadcn-ui';
import { postDashboardSseSubscription } from '@/services/dashboard';

export const usePostCardSubscription = () => {
  const {
    mutate: subscribeDashboardCardMutation,
    isPending: isSubscribingDashboardCard,
  } = useMutation({
    mutationFn: postDashboardSseSubscription,
  });

  const isPendingRef = useRef(isSubscribingDashboardCard);

  useEffect(() => {
    isPendingRef.current = isSubscribingDashboardCard;
  }, [isSubscribingDashboardCard]);

  const subscribeDashboardCardList = useCallback(
    function subscribeDashboardCardList(
      variables: Parameters<typeof postDashboardSseSubscription>[0],
    ) {
      subscribeDashboardCardMutation(variables, {
        onError: () => {
          toast.error(
            '지표 카드 데이터 연결에 실패했어요. 다시 시도해주세요.',
            {
              action: (
                <Button
                  className="h-fit w-fit"
                  onClick={() => {
                    subscribeDashboardCardList(variables);
                  }}
                  disabled={isPendingRef.current}
                  aria-label="다시 시도하기"
                >
                  <RefreshCcwIcon className="size-4" />
                </Button>
              ),
            },
          );
        },
      });
    },
    [subscribeDashboardCardMutation],
  );

  return {
    subscribeDashboardCardList,
  };
};
