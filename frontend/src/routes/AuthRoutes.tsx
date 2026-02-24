import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';
import { signInLoader } from '@/pages/sign-in-page';
import { queryClient } from '@/services/shared';

const SignInPage = lazy(() => import('@/pages/sign-in-page/SignInPage'));

export const authRoutes: RouteObject = {
  path: ROUTE_PATHS.SIGN_IN,
  loader: signInLoader(queryClient),
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  Component: () => (
    <Suspense fallback={<Spinner className="text-brand-main size-5" />}>
      <SignInPage />
    </Suspense>
  ),
};
