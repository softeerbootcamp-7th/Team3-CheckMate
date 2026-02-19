import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import {
  deleteDashboardSseSubscription,
  postDashboardSseSubscription,
} from '@/services/dashboard';
import type { GetDashboardCardListResponseDto } from '@/types/dashboard';

interface UseDashboardCardSubscriptionProps {
  cardList: GetDashboardCardListResponseDto;
}

export const useDashboardCardSubscription = ({
  cardList,
}: UseDashboardCardSubscriptionProps) => {
  const { mutate: subscribeDashboardCardList } = useMutation({
    mutationFn: postDashboardSseSubscription,
  });

  const { mutate: unsubscribeDashboardCardList } = useMutation({
    mutationFn: deleteDashboardSseSubscription,
  });

  useEffect(() => {
    if (!cardList || cardList.length === 0) {
      return;
    }

    subscribeDashboardCardList({
      topics: cardList.map((card) => card.cardCode),
    });

    return () => {
      if (cardList && cardList.length > 0) {
        unsubscribeDashboardCardList({
          topics: cardList.map((card) => card.cardCode),
        });
      }
    };
  }, [cardList, subscribeDashboardCardList, unsubscribeDashboardCardList]);
};
