import { useContext } from 'react';

import { DashboardTabsContext } from '@/constants/dashboard';

export const useDashboardTabsContext = () => {
  const context = useContext(DashboardTabsContext);

  if (!context) {
    throw new Error('DashboardTabsContext not found');
  }

  return context;
};
