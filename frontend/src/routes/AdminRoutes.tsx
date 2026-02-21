import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { AdminPage } from '@/pages/admin-page';

export const adminRoutes: RouteObject = {
  path: ROUTE_PATHS.ADMIN,
  Component: AdminPage,
};
