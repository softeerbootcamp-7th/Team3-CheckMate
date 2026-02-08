import { gridItems } from '@/mocks/data/dashboard';

import { DashboardEmptyContent } from './DashboardEmptyContent';
import { DashboardMainContent } from './DashboardMainContent';

interface DashboardMainLayoutProps {
  tabName: string;
}

export const DashboardMain = ({ tabName }: DashboardMainLayoutProps) => {
  const mockedGridItems = tabName === '홈 대시보드' ? gridItems : null;

  return (
    <>
      {mockedGridItems ? (
        <DashboardMainContent gridItems={mockedGridItems} />
      ) : (
        <DashboardEmptyContent />
      )}
    </>
  );
};
