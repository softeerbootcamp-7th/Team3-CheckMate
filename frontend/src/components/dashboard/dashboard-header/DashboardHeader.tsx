import { DashboardTabList } from '../dashboard-tab-list';

import { DashboardEditButton } from './DashboardEditButton';
import { TabManagementDialogTrigger } from './TabManagementDialogTrigger';

export const DashboardHeader = () => {
  return (
    <header className="mb-8.5 flex justify-between">
      <DashboardTabList />
      <div className="flex gap-3.5">
        <TabManagementDialogTrigger />
        <DashboardEditButton />
      </div>
    </header>
  );
};
