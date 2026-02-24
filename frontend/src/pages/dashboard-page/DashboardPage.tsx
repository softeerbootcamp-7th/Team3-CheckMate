import {
  DashboardLayout,
  DashboardSseWorkerProvider,
  DashboardTabsDialog,
  DashboardTabsProvider,
} from '@/components/dashboard';
import { FetchBoundary } from '@/components/shared';

export const DashboardPage = () => {
  return (
    <FetchBoundary>
      <DashboardSseWorkerProvider>
        <DashboardTabsProvider>
          <DashboardLayout />
          <DashboardTabsDialog />
        </DashboardTabsProvider>
      </DashboardSseWorkerProvider>
    </FetchBoundary>
  );
};
