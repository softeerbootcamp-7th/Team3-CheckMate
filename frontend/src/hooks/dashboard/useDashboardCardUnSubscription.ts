import { useEffect, useMemo } from 'react';

import { DASHBOARD_SSE_EVENT } from '@/constants/dashboard';
import type { GetDashboardCardListResponseDto } from '@/types/dashboard';

import { useDashboardSseWorkerContext } from './sse';

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

  const { postMessage } = useDashboardSseWorkerContext();

  useEffect(() => {
    return () => {
      if (topics.length > 0) {
        postMessage({
          type: DASHBOARD_SSE_EVENT.UNSUBSCRIBE,
          data: {
            topics,
          },
        });
      }
    };
  }, [topics, postMessage]);
};
