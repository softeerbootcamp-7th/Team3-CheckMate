import { authorizedApi } from '@/services/shared';
import type { PostAiIngredientRecommendResponseDto } from '@/types/ingredient';

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
  return data;
};
