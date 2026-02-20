import { useSuspenseQuery } from '@tanstack/react-query';

import { dashboardOptions } from '@/services/dashboard';

import { useDashboardTabsContext } from './useDashboardTabsContext';

export const useDashboardCardList = () => {
  const { currentDashboardId } = useDashboardTabsContext();

  const { data: cardList } = useSuspenseQuery(
    dashboardOptions.cardList(currentDashboardId),
  );

  return { cardList };
};
