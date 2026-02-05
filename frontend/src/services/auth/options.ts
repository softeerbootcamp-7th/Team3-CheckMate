import { queryOptions } from '@tanstack/react-query';

import { getAuthStatus } from './get';
import { authKeys } from './keys';

export const authOptions = {
  status: queryOptions({
    queryKey: authKeys.status(),
    queryFn: getAuthStatus,
  }),
};
