import { Tabs } from '@/components/shared/shadcn-ui';
import { useDashboardTabsContext } from '@/hooks/dashboard';

import { DashboardHeader } from '../dashboard-header';
import { DashboardMain } from '../dashboard-main';

export const DashboardLayout = () => {
  const { tabs, currentTabIndex, setCurrentTabIndex } =
    useDashboardTabsContext();

  return (
    <Tabs
      value={tabs[currentTabIndex]}
      onValueChange={(tabName) => setCurrentTabIndex(tabs.indexOf(tabName))}
      className="mt-8 w-265"
    >
      <DashboardHeader />
      <DashboardMain />
    </Tabs>
  );
};
