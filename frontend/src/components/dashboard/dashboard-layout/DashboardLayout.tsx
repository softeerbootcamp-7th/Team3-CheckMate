import { useState } from 'react';

import { Tabs } from '@/components/shared/shadcn-ui';
import { useDashboardTabsContext } from '@/hooks/dashboard';

import { DashboardHeader } from '../dashboard-header';
import { DashboardMain } from '../dashboard-main';

export const DashboardLayout = () => {
  const { tabs } = useDashboardTabsContext();
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);

  // currentTab이 tabs에 없으면 홈 대시보드로 fallback
  const validTab = tabs.includes(currentTab) ? currentTab : tabs[0];

  return (
    <Tabs value={validTab} onValueChange={setCurrentTab} className="mt-8">
      <DashboardHeader />
      <DashboardMain tabName={validTab} />
    </Tabs>
  );
};
