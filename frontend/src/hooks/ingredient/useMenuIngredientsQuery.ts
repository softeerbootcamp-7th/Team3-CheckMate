import { useSuspenseQuery } from '@tanstack/react-query';

import { ingredientOptions } from '@/services/ingredient';
interface UseMenuIngredientsQueryParams {
  menuId: number;
}
export const useMenuIngredientsQuery = ({
  menuId,
}: UseMenuIngredientsQueryParams) => {
  return useSuspenseQuery(ingredientOptions.menuingredients(menuId));
};
