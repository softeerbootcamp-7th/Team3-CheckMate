import type { RouteObject } from 'react-router-dom';

import { SignInPage } from '@/pages/sigin-in-page';

export const signInRouter: RouteObject = {
  path: '/sign-in',
  Component: SignInPage,
};
