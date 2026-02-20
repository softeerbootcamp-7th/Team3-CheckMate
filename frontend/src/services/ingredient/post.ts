import type { Ingredient } from '@/types/ingredient';
import { buildIngredientRegisterBody } from '@/utils/ingredient';

import { authorizedApi } from '../shared';

// 메뉴에 식자재 등록 요청하는 함수
interface PostIngredientRegisterParams {
  menuId: number;
  menuIngredients: Ingredient[];
}
export const postIngredientRegister = async ({
  menuId,
  menuIngredients,
}: PostIngredientRegisterParams) => {
  // body 만드는 과정 :  UI에서 사용 하는 단위를 서버에서 사용하는 단위(전부 대문자)로 변환
  const body = buildIngredientRegisterBody({ menuIngredients });

  const { data } = await authorizedApi.post(
    `/api/menus/${menuId}/ingredients`,
    {
      body: JSON.stringify(body),
    },
  );
  return data;
};
