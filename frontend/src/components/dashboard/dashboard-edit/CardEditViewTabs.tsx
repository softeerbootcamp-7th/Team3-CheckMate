import { useMemo } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/shadcn-ui';
import { DASHBOARD_METRICS } from '@/constants/dashboard';

import { CardEditViewTabContent } from './CardEditViewTabContent';

export const CardEditViewTabs = () => {
  const dashboardMetrics = useMemo(() => Object.values(DASHBOARD_METRICS), []);
  return (
    <Tabs defaultValue={dashboardMetrics[0].tab} className="h-full">
      <TabsList className="mx-0 mt-10 gap-1000" variant="line">
        {dashboardMetrics.map(({ tab }) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="after:bg-brand-main data-[state=active]:body-large-semibold data-[state=active]:text-grey-900 data-[state=inactive]:body-large-medium data-[state=inactive]:text-grey-700 z-1 px-0 pb-250! data-[state=active]:after:h-1"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <hr className="text-grey-300 -mt-2 h-0.5 w-full" />
      {dashboardMetrics.map(({ tab, sections }) => (
        <TabsContent key={tab} value={tab} className="h-full overflow-y-auto">
          <CardEditViewTabContent sections={sections} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
