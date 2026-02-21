import { useQueryClient } from '@tanstack/react-query';

import { ingredientOptions } from '@/services/ingredient';

// 특정 메뉴에 대한 식자재 목록 prefetch 하기
export const usePrefetchMenuIngredients = () => {
  const queryClient = useQueryClient();
  const prefetchMenuIngredients = ({ menuId }: { menuId: number }) => {
    queryClient.prefetchQuery(ingredientOptions.menuingredients(menuId));
  };
  return { prefetchMenuIngredients };
};
