import { Navigate, Outlet, type RouteObject } from 'react-router-dom';

import { authRoutes } from './AuthRoutes';
import { mainPageRoutes } from './MainPageRoutes';
import { onboardingRoutes } from './OnboardingRoutes';

export const rootRoutes: RouteObject = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="/sign-in" replace />,
    },
    mainPageRoutes,
    authRoutes,
    onboardingRoutes,
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ],
};
