import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { SignInPage } from '@/pages/sign-in-page';

import { Spinner } from '@/components/shared';
import { signInLoader, SignInPage } from '@/pages/sign-in-page';
import { queryClient } from '@/services/shared';

export const authRoutes: RouteObject = {
  path: ROUTE_PATHS.SIGN_IN,
  loader: signInLoader(queryClient),
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  Component: SignInPage,
};
