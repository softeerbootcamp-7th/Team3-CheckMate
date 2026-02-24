import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';
import { adminLoader } from '@/pages/admin-page';
import { queryClient } from '@/services/shared';

const AdminPage = lazy(() => import('@/pages/admin-page/AdminPage'));

export const adminRoutes: RouteObject = {
  path: ROUTE_PATHS.ADMIN,
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  loader: adminLoader(queryClient),
  Component: () => (
    <Suspense fallback={<Spinner className="text-brand-main size-5" />}>
      <AdminPage />
    </Suspense>
  ),
};
