import { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';
import { adminLoader, AdminPage } from '@/pages/admin-page';
import { queryClient } from '@/services/shared';

export const adminRoutes: RouteObject = {
  path: ROUTE_PATHS.ADMIN,
  loader: adminLoader(queryClient),
  Component: () => (
    <Suspense fallback={<Spinner className="text-brand-main size-5" />}>
      <AdminPage />
    </Suspense>
  ),
};
