import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';

const PrivacyPage = lazy(() => import('@/pages/privacy-page/PrivacyPage'));

export const privacyRoutes: RouteObject = {
  path: ROUTE_PATHS.PRIVACY,
  Component: () => (
    <Suspense fallback={<Spinner className="text-brand-main size-5" />}>
      <PrivacyPage />
    </Suspense>
  ),
};
