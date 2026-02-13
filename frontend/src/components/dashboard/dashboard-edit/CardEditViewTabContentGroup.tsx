import { useMemo } from 'react';

import { TabsContent } from '@/components/shared/shadcn-ui';
import { DASHBOARD_METRICS } from '@/constants/dashboard';

import { CardEditViewTabContent } from './CardEditViewTabContent';

export const CardEditViewTabContentGroup = () => {
  const dashboardMetrics = useMemo(() => Object.values(DASHBOARD_METRICS), []);

  return (
    <>
      {dashboardMetrics.map(({ tab, sections }) => (
        <TabsContent key={tab} value={tab} className="h-full overflow-y-auto">
          <CardEditViewTabContent sections={sections} />
        </TabsContent>
      ))}
    </>
  );
};
