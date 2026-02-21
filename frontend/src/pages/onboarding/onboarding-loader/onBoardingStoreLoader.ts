import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { authOptions } from '@/services/auth/options';

export const onBoardingStoreLoader = (queryClient: QueryClient) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await queryClient
    .ensureQueryData(authOptions.status)
    .catch(() => {
      return null;
    });

  if (!data) {
    return redirect('/sign-in');
  }

  if (data.hasPosIntegration) {
    return redirect('/dashboard');
  }

  if (data.hasStore) {
    return redirect('/onboarding/pos');
  }

  return null;
};
