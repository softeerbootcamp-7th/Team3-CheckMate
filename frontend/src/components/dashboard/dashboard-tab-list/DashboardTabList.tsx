import { TabsList, TabsTrigger } from '@/components/shared/shadcn-ui';
import { MAX_DASHBOARD_TABS } from '@/constants/dashboard';
import { useDashboardTabsContext } from '@/hooks/dashboard';

import { AddTabDialogTrigger } from './AddTabDialogTrigger';

export const DashboardTabList = () => {
  const { tabs } = useDashboardTabsContext();
  return (
    <TabsList
      aria-label="대시보드 탭 목록"
      className="bg-others-tap-bg rounded-200 flex h-fit! items-center p-100"
    >
      {tabs.map((tabName) => (
        <TabsTrigger
          key={`trigger-${tabName}`}
          value={tabName}
          role="tab"
          aria-label={`${tabName} 탭`}
          aria-controls={tabName}
          className="rounded-150 text-grey-700 data-[state=inactive]:body-medium-medium data-[state=active]:bg-special-card-bg data-[state=active]:text-grey-900 data-[state=active]:body-medium-bold h-9 min-w-28.5 bg-transparent px-4 shadow-none!"
        >
          {tabName}
        </TabsTrigger>
      ))}
      {tabs.length < MAX_DASHBOARD_TABS && <AddTabDialogTrigger />}
    </TabsList>
  );
};
