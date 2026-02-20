// 메뉴에 등록된 식자재 변경하는 용도의 put
import type { Ingredient } from '@/types/ingredient';
import { buildIngredientRegisterBody } from '@/utils/ingredient';

import { authorizedApi } from '../shared';

// 메뉴에 등록된 식자재 변경하는 함수
interface PutIngredientRegisterParams {
  menuId: number;
  menuIngredients: Ingredient[];
}
export const putIngredientRegister = async ({
  menuId,
  menuIngredients,
}: PutIngredientRegisterParams) => {
  // body 만드는 과정 :  UI에서 사용 하는 단위를 서버에서 사용하는 단위(전부 대문자)로 변환

  const body = buildIngredientRegisterBody({ menuIngredients });
  const { data } = await authorizedApi.put(`/api/menus/${menuId}/ingredients`, {
    body: JSON.stringify(body),
  });
  return data;
};
