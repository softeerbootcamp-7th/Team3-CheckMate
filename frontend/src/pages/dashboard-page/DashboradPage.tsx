import { DashboardLayout, DashboardTabsProvider } from '@/components/dashboard';

export const DashboardPage = () => {
  return (
    <DashboardTabsProvider>
      <DashboardLayout />
      {/* <DashboardTabsDialog /> */}
    </DashboardTabsProvider>
  );
};
