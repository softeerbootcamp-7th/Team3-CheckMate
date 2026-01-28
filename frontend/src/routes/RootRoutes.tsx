import { Navigate, Outlet, type RouteObject } from 'react-router-dom';

import { mainPageRoutes } from './MainPageRoutes';
import { onBoardingRoutes } from './OnBoardingRoutes';
import { signInRoutes } from './SignInRoutes';

export const rootRoutes: RouteObject = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="/sign-in" replace />,
    },
    mainPageRoutes,
    signInRoutes,
    onBoardingRoutes,
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ],
};
