import type { RouteObject } from 'react-router-dom';

import { DashboardPage } from '@/pages/dashboard-page';

export const dashboardRoutes: RouteObject = {
  path: '/dashboard',
  Component: DashboardPage,
};
