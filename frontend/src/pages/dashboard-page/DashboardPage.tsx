import {
  DashboardLayout,
  DashboardTabsDialog,
  DashboardTabsProvider,
} from '@/components/dashboard';
import { FetchBoundary } from '@/components/shared';

const DashboardPage = () => {
  return (
    <FetchBoundary>
      <DashboardTabsProvider>
        <DashboardLayout />
        <DashboardTabsDialog />
      </DashboardTabsProvider>
    </FetchBoundary>
  );
};

export default DashboardPage;
