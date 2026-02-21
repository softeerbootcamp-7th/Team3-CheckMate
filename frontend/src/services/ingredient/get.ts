import type {
  GetCategoryMenusResponseDto,
  GetMenuIngredientsResponseDto,
} from '@/types/ingredient';

import { authorizedApi } from '../shared';

// 매장에 등록된 메뉴 조회
export const getRegisteredMenus = async () => {
  const { data } =
    await authorizedApi.get<GetCategoryMenusResponseDto>('/api/menus');

  return data;
};

interface GetMenuIngredientsParams {
  menuId: number;
}
// 각 메뉴 별 등록된 식자재 조회
export const getMenuIngredients = async ({
  menuId,
}: GetMenuIngredientsParams) => {
  const { data } = await authorizedApi.get<GetMenuIngredientsResponseDto>(
    `/api/menus/${menuId}/recipe`,
  );

  return data;
};
