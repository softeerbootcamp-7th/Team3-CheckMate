import { useContext } from 'react';

import { DashboardSseWorkerContext } from '@/constants/dashboard';

export const useDashboardSseWorkerContext = () => {
  const context = useContext(DashboardSseWorkerContext);

  if (!context) {
    throw new Error('DashboardSseWorkerContext not found');
  }

  return context;
};
