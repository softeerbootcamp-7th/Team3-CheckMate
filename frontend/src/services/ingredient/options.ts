import { queryOptions } from '@tanstack/react-query';

import { getMenuIngredients } from './get';
import { ingredientKeys } from './keys';

export const ingredientOptions = {
  menuIngredients: (menuId: number) =>
    queryOptions({
      queryKey: ingredientKeys.menuIngredients(menuId),
      queryFn: () => getMenuIngredients({ menuId }),
      staleTime: 5 * 60 * 1000, // 이전에 프리패치한 데이터가 5분 이내의 데이터라면 서버에 재요청하지 않고 캐시된 데이터 사용
    }),
};
