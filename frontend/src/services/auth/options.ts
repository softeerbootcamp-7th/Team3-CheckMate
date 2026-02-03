import { queryOptions } from '@tanstack/react-query';

import { getAuthMe } from './get';
import { authKeys } from './keys';

export const authOptions = {
  me: queryOptions({
    queryKey: authKeys.me(),
    queryFn: getAuthMe,
  }),
};
