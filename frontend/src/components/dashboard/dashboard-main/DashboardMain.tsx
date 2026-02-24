import {
  useDashboardCardList,
  useDashboardCardUnSubscription,
} from '@/hooks/dashboard';

import { DashboardEmptyContent } from './DashboardEmptyContent';
import { DashboardMainContent } from './DashboardMainContent';

export const DashboardMain = () => {
  const { cardList } = useDashboardCardList();
  useDashboardCardUnSubscription({ cardList });

  if (!cardList || cardList.length === 0) {
    return <DashboardEmptyContent />;
  }

  return <DashboardMainContent cards={cardList} />;
};
