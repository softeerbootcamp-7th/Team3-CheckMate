import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { authOptions } from '@/services/auth/options';

export const adminLoader = (queryClient: QueryClient) => async () => {
  const data = await queryClient
    .ensureQueryData(authOptions.status)
    .catch(() => {
      return null;
    });

  if (!data) {
    return redirect('/sign-in');
  }

  return data;
};
