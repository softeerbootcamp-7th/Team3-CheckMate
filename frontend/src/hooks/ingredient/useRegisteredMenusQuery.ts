import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/constants/shared';
import { getRegisteredMenus, ingredientKeys } from '@/services/ingredient';

export const useRegisteredMenusQuery = () => {
  return useSuspenseQuery({
    queryKey: ingredientKeys.registeredMenus(),
    queryFn: getRegisteredMenus,
    ...QUERY_CACHE.MUTABLE,
  });
};
