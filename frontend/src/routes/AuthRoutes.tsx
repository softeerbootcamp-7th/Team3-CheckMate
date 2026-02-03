import type { RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { signInLoader, SignInPage } from '@/pages/sign-in-page';
import { queryClient } from '@/services/shared';

export const authRoutes: RouteObject = {
  path: '/sign-in',
  loader: signInLoader(queryClient),
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  Component: SignInPage,
};
