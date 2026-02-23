import { useEffect } from 'react';

import type { GetDashboardCardListResponseDto } from '@/types/dashboard';

import { usePostCardSubscription } from './usePostCardSubscription';

interface UseDashboardCardSubscriptionProps {
  cardList: GetDashboardCardListResponseDto;
}

export const useDashboardCardSubscription = ({
  cardList,
}: UseDashboardCardSubscriptionProps) => {
  const { subscribeDashboardCardList } = usePostCardSubscription();

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
