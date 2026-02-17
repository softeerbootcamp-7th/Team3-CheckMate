import { useSuspenseQuery } from '@tanstack/react-query';

import { useDashboardTabsContext } from '@/hooks/dashboard';
import { dashboardOptions } from '@/services/dashboard';

import { DashboardEmptyContent } from './DashboardEmptyContent';
import { DashboardMainContent } from './DashboardMainContent';

export const DashboardMain = () => {
  const { currentDashboardId } = useDashboardTabsContext();

  const { data: cardList } = useSuspenseQuery(
    dashboardOptions.cardList(currentDashboardId),
  );

  return (
    <>
      {cardList ? (
        <DashboardMainContent cards={cardList} />
      ) : (
        <DashboardEmptyContent />
      )}
    </>
  );
};
