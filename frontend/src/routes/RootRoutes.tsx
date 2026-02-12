import { Navigate, Outlet, type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { RootErrorFallback } from '@/pages/root-error-fallback';

import { authRoutes } from './AuthRoutes';
import { mainPageRoutes } from './MainPageRoutes';
import { onboardingRoutes } from './OnboardingRoutes';
import { privacyRoutes } from './PrivacyRoutes';
import { termsRoutes } from './TermsRoutes';

export const rootRoutes: RouteObject = {
  path: '/',
  element: <Outlet />,
  errorElement: <RootErrorFallback />,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTE_PATHS.SIGN_IN} replace />,
    },
    mainPageRoutes,
    authRoutes,
    onboardingRoutes,
    privacyRoutes,
    termsRoutes,
    {
      path: '*',
      element: <Navigate to={ROUTE_PATHS.DASHBOARD.BASE} replace />,
    },
  ],
};
