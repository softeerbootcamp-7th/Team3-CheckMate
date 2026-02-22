import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import { postDashboardSseSubscription } from '@/services/dashboard';
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

  useEffect(() => {
    if (!cardList || cardList.length === 0) {
      return;
    }

    const topics = cardList.map((card) => card.cardCode);

    subscribeDashboardCardList({
      topics,
    });
  }, [cardList, subscribeDashboardCardList]);
};
