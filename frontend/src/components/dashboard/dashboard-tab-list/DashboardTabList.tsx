import { useSuspenseQuery } from '@tanstack/react-query';

import { TabsList, TabsTrigger } from '@/components/shared/shadcn-ui';
import { MAX_DASHBOARD_TABS } from '@/constants/dashboard';
import { dashboardOptions } from '@/services/dashboard';

import { AddTabDialogTrigger } from './AddTabDialogTrigger';

export const DashboardTabList = () => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list) ?? undefined;

  return (
    <TabsList
      aria-label="대시보드 탭 목록"
      className="bg-others-tap-bg rounded-200 flex h-fit! items-center p-100"
    >
      {tabs.map((dashboard) => (
        <TabsTrigger
          key={`trigger-${dashboard.name}`}
          value={dashboard.id.toString()}
          role="tab"
          aria-label={`${dashboard.name} 탭`}
          aria-controls={dashboard.name}
          className="rounded-150 text-grey-700 data-[state=inactive]:body-medium-medium data-[state=active]:bg-special-card-bg data-[state=active]:text-grey-900 data-[state=active]:body-medium-bold h-9 min-w-28.5 bg-transparent px-4 shadow-none!"
        >
          {dashboard.name}
        </TabsTrigger>
      ))}
      {tabs.length < MAX_DASHBOARD_TABS && <AddTabDialogTrigger />}
    </TabsList>
  );
};
