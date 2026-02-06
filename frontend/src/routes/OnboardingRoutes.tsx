import { Navigate, type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { Spinner } from '@/components/shared';
import { onBoardingStoreLoader } from '@/pages/onboarding/onboarding-loader';
import { onBoardingPosLoader } from '@/pages/onboarding/onboarding-loader/onBoardingPosLoader';
import { PosIntegrationPage } from '@/pages/onboarding/pos-integration-page';
import { StoreRegisterPage } from '@/pages/onboarding/store-register-page';
import { queryClient } from '@/services/shared';

export const onboardingRoutes: RouteObject = {
  path: ROUTE_PATHS.ONBOARDING.BASE,
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
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
