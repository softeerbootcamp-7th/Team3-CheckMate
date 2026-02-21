import { useSuspenseQuery } from '@tanstack/react-query';

import { getMenuIngredients, ingredientKeys } from '@/services/ingredient';
interface UseMenuIngredientsQueryParams {
  menuId: number;
}
export const useMenuIngredientsQuery = ({
  menuId,
}: UseMenuIngredientsQueryParams) => {
  return useSuspenseQuery({
    queryKey: ingredientKeys.menuIngredients(menuId),
    queryFn: () => getMenuIngredients({ menuId }),
  });
};
