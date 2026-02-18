import { SERVER_TO_UI_UNIT } from '@/constants/ingredient';
import type {
  GetCategoryMenusResponseDto,
  MenuIngredients,
} from '@/types/ingredient';
import type { GetMenuIngredientsResponseDto } from '@/types/ingredient/dto';

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
}: GetMenuIngredientsParams): Promise<MenuIngredients> => {
  const { data } = await authorizedApi.get<GetMenuIngredientsResponseDto>(
    `/api/menus/${menuId}/recipe`,
  );

  // 서버에서 보내주는 단위(대문자)를 UI에서 사용하는 단위로 변환
  return {
    menuName: data.menuName,
    ingredients: data.ingredients.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: SERVER_TO_UI_UNIT[item.unit],
    })),
  };
};
