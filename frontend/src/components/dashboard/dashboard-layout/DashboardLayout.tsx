import { FetchBoundary } from '@/components/shared';
import { Tabs } from '@/components/shared/shadcn-ui';
import {
  useDashboardSseWorkerMessageHandler,
  useDashboardTabsContext,
} from '@/hooks/dashboard';

import { DashboardHeader } from '../dashboard-header';
import { DashboardMain } from '../dashboard-main';
import { DashboardMainSuspense } from '../dashboard-main';

export const DashboardLayout = () => {
  const { currentDashboardId, setCurrentDashboardId } =
    useDashboardTabsContext();
  useDashboardSseWorkerMessageHandler();
  return (
    <Tabs
      value={currentDashboardId.toString()}
      onValueChange={(value) => setCurrentDashboardId(Number(value))}
      className="mt-8 w-265"
    >
      <DashboardHeader />
      <FetchBoundary LoadingFallback={DashboardMainSuspense}>
        <DashboardMain />
      </FetchBoundary>
    </Tabs>
  );
};
