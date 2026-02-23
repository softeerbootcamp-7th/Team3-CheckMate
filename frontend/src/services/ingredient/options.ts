import { queryOptions } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/constants/shared';

import { getMenuIngredients } from './get';
import { ingredientKeys } from './keys';

export const ingredientOptions = {
  menuIngredients: (menuId: number) =>
    queryOptions({
      queryKey: ingredientKeys.menuIngredients(menuId),
      queryFn: () => getMenuIngredients({ menuId }),
      ...QUERY_CACHE.MUTABLE,
    }),
};
