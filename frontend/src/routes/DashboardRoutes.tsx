import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { DashboardEditPage } from '@/pages/dashboard-edit-page/DashboardEditPage';
import { DashboardPage } from '@/pages/dashboard-page';

export const dashboardRoutes: RouteObject = {
  path: ROUTE_PATHS.DASHBOARD.BASE,

  children: [
    {
      index: true,
      Component: DashboardPage,
    },
    {
      path: ROUTE_PATHS.DASHBOARD.EDIT,
      Component: DashboardEditPage,
      handle: {
        hideSidebar: true, // 대시보드 편집 페이지에서는 사이드바 숨김
      },
    },
  ],
};
