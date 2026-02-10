import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { DashboardPage } from '@/pages/dashboard-page';

export const dashboardRoutes: RouteObject = {
  path: ROUTE_PATHS.DASHBOARD,
  Component: DashboardPage,
};
