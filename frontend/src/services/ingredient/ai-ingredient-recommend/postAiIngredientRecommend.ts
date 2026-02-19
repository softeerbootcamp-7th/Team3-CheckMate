import { authorizedApi } from '@/services/shared';
import type { PostAiIngredientRecommendResponseDto } from '@/types/ingredient';
import { convertServerUnitToUiUnit } from '@/utils/ingredient';

interface PostAiIngredientRecommendParams {
  menuId: number;
}
// AI에서 식재료 추천 받아오는 함수
export const postAiIngredientRecommend = async ({
  menuId,
}: PostAiIngredientRecommendParams) => {
  // 오류 발생하면 tanstack query에서 자동으로 잡아 onError 콜백으로 넘긴다 -> try catch 불필요
  const { data } =
    await authorizedApi.post<PostAiIngredientRecommendResponseDto>(
      `/api/menus/${menuId}/auto-complete`,
    );
  // 서버에서 보내주는 단위(대문자)를 UI에서 사용하는 단위로 변환
  return {
    menuName: data.menuName,
    ingredients: data.ingredients.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: convertServerUnitToUiUnit(item.unit),
    })),
  };
};
