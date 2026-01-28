import type { RouteObject } from 'react-router-dom';

import { SignInPage } from '@/pages/sign-in-page';

export const authRoutes: RouteObject = {
  path: '/sign-in',
  Component: SignInPage,
};
