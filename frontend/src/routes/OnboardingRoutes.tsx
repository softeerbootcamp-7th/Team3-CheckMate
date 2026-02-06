import { Navigate, type RouteObject } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { onBoardingStoreLoader } from '@/pages/onboarding/onboarding-loader';
import { onBoardingPosLoader } from '@/pages/onboarding/onboarding-loader/onBoardingPosLoader';
import { PosIntegrationPage } from '@/pages/onboarding/pos-integration-page';
import { StoreRegisterPage } from '@/pages/onboarding/store-register-page';
import { queryClient } from '@/services/shared';

export const onboardingRoutes: RouteObject = {
  path: '/onboarding',
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  children: [
    {
      index: true,
      element: <Navigate to="store" replace />,
    },
    {
      path: 'store',
      loader: onBoardingStoreLoader(queryClient),
      Component: StoreRegisterPage,
    },
    {
      path: 'pos',
      loader: onBoardingPosLoader(queryClient),
      Component: PosIntegrationPage,
    },
  ],
};
