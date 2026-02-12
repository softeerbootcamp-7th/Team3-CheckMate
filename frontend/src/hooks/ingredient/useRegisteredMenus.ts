import { useSuspenseQuery } from '@tanstack/react-query';

import { getRegisteredMenus, ingredientKeys } from '@/services/ ingredient';

export const useRegisteredMenus = () => {
  return useSuspenseQuery({
    queryKey: ingredientKeys.registeredMenus(),
    queryFn: getRegisteredMenus,
  });
};
