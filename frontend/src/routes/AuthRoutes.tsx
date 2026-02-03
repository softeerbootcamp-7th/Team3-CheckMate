import type { RouteObject } from 'react-router-dom';

import { signInLoader, SignInPage } from '@/pages/sign-in-page';
import { queryClient } from '@/services/shared';

export const authRoutes: RouteObject = {
  path: '/sign-in',
  loader: signInLoader(queryClient),
  Component: SignInPage,
};
