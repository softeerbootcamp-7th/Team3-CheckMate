import type { RouteObject } from 'react-router-dom';

import { OnboardingPage } from '@/pages/onboarding-page';

export const onboardingRoutes: RouteObject = {
  path: '/onboarding',
  Component: OnboardingPage,
};
