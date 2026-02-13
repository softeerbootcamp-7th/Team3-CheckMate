import { useDashboardTabsContext } from '@/hooks/dashboard';
import { gridItems } from '@/mocks/data/dashboard';

import { DashboardEmptyContent } from './DashboardEmptyContent';
import { DashboardMainContent } from './DashboardMainContent';

export const DashboardMain = () => {
  const { tabs, currentTabIndex } = useDashboardTabsContext();

  const mockedGridItems =
    tabs[currentTabIndex] === '홈 대시보드' ? gridItems : null;

  return (
    <>
      {mockedGridItems ? (
        <DashboardMainContent cards={mockedGridItems} />
      ) : (
        <DashboardEmptyContent />
      )}
    </>
  );
};
