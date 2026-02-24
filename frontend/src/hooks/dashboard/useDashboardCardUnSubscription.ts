import { useEffect, useMemo, useRef } from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteDashboardSseSubscription } from '@/services/dashboard';
import type {
  DeleteDashboardSseSubscriptionRequestDto,
  GetDashboardCardListResponseDto,
} from '@/types/dashboard';

interface UseDashboardCardUnSubscriptionProps {
  cardList: GetDashboardCardListResponseDto;
}

export const useDashboardCardUnSubscription = ({
  cardList,
}: UseDashboardCardUnSubscriptionProps) => {
  const topics = useMemo(
    () => cardList.map((card) => card.cardCode),
    [cardList],
  );

  const retryRef = useRef(0);

  const { mutate: unsubscribeDashboardCardList } = useMutation({
    mutationFn: deleteDashboardSseSubscription,
    onSuccess: () => {},
    onError: (
      _error: unknown,
      variables: DeleteDashboardSseSubscriptionRequestDto,
    ) => {
      retryRef.current++;
      if (retryRef.current < 3) {
        unsubscribeDashboardCardList({
          topics: variables.topics,
        });
      }
    },
  });

  useEffect(() => {
    return () => {
      if (topics.length > 0) {
        unsubscribeDashboardCardList({
          topics,
        });
      }
    };
  }, [topics, unsubscribeDashboardCardList]);
};
