import {
  DashboardLayout,
  DashboardTabsDialog,
  DashboardTabsProvider,
} from '@/components/dashboard';
import { FetchBoundary } from '@/components/shared';

export const DashboardPage = () => {
  return (
    <DashboardTabsProvider>
      <FetchBoundary>
        <DashboardLayout />
        <DashboardTabsDialog />
      </FetchBoundary>
    </DashboardTabsProvider>
  );
};
