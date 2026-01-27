import { Navigate, Outlet, type RouteObject } from 'react-router-dom';

import { mainPageRoutes } from './MainPageRouter';
import { signInRouter } from './SignInRouter';

export const rootRouter: RouteObject = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: '/',
      element: <Navigate to="dashboard" replace />,
    },
    mainPageRoutes,
    signInRouter,
  ],
};
