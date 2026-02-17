import { Suspense } from 'react';

import { Tabs } from '@/components/shared/shadcn-ui';
import { useDashboardTabsContext } from '@/hooks/dashboard';

import { DashboardHeader } from '../dashboard-header';
import { DashboardMain } from '../dashboard-main';
import { DashboardMainSuspense } from '../dashboard-main';

export const DashboardLayout = () => {
  const { currentDashboardId, setCurrentDashboardId } =
    useDashboardTabsContext();

  return (
    <Tabs
      value={currentDashboardId.toString()}
      onValueChange={(value) => setCurrentDashboardId(Number(value))}
      className="mt-8 w-265"
    >
      <DashboardHeader />
      <Suspense fallback={<DashboardMainSuspense />}>
        <DashboardMain />
      </Suspense>
    </Tabs>
  );
};
