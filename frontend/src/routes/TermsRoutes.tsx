import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';

const TermsPage = lazy(() => import('@/pages/terms-page/TermsPage'));

export const termsRoutes: RouteObject = {
  path: ROUTE_PATHS.TERMS,
  Component: () => (
    <Suspense fallback={<Spinner className="text-brand-main size-5" />}>
      <TermsPage />
    </Suspense>
  ),
};
