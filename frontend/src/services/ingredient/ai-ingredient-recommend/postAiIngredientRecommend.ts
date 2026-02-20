import { authorizedApi } from '@/services/shared';
import type {
  PostAiIngredientRecommendRequestDto,
  PostAiIngredientRecommendResponseDto,
} from '@/types/ingredient';

// AI에서 식재료 추천 받아오는 함수
export const postAiIngredientRecommend = async (
  dto: PostAiIngredientRecommendRequestDto,
) => {
  // 오류 발생하면 tanstack query에서 자동으로 잡아 onError 콜백으로 넘긴다 -> try catch 불필요
  const { data } =
    await authorizedApi.post<PostAiIngredientRecommendResponseDto>(
      '/api/ingredient/ai-ingredient-recommend',
      {
        body: JSON.stringify(dto),
      },
    );

  return data;
};
