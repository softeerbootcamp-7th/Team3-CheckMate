import { Navigate, type RouteObject } from 'react-router-dom';

import { StoreRegisterPage } from '@/pages/onboarding/store-register-page';

export const onboardingRoutes: RouteObject = {
  path: '/onboarding',
  children: [
    {
      index: true,
      element: <Navigate to="store" replace />,
    },
    {
      path: 'store',
      Component: StoreRegisterPage,
    },
    {
      path: 'pos',
    },
  ],
};
