import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { authOptions } from '@/services/auth/options';

export const mainPageLoader = (queryClient: QueryClient) => async () => {
  const data = await queryClient
    .ensureQueryData(authOptions.status)
    .catch(() => {
      return null;
    });

  if (!data) {
    return redirect('/sign-in');
  }

  if (data.hasPosIntegration) {
    return null;
  }

  if (data.hasStore) {
    return redirect('/onboarding/pos');
  }

  return redirect('/onboarding/store');
};
