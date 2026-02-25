import {
  DashboardLayout,
  DashboardSseWorkerProvider,
  DashboardTabsDialog,
  DashboardTabsProvider,
} from '@/components/dashboard';
import { FetchBoundary } from '@/components/shared';

const DashboardPage = () => {
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

export default DashboardPage;
