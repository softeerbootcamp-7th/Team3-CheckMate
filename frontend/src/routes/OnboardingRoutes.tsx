import { Navigate, type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import {
  OnboardingLoadingFallback,
  onBoardingPosLoader,
  onBoardingStoreLoader,
  PosIntegrationPage,
  StoreRegisterPage,
} from '@/pages/onboarding';
import { queryClient } from '@/services/shared';

export const onboardingRoutes: RouteObject = {
  path: ROUTE_PATHS.ONBOARDING.BASE,
  hydrateFallbackElement: <OnboardingLoadingFallback />,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTE_PATHS.ONBOARDING.STORE} replace />,
    },
    {
      path: ROUTE_PATHS.ONBOARDING.STORE,
      loader: onBoardingStoreLoader(queryClient),
      Component: StoreRegisterPage,
    },
    {
      path: ROUTE_PATHS.ONBOARDING.POS,
      loader: onBoardingPosLoader(queryClient),
      Component: PosIntegrationPage,
    },
  ],
};
