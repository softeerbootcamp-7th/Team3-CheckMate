import { HttpResponse } from 'msw';

import { mswHttp } from '@/mocks/shared';
import type { SuccessResponse } from '@/services/shared';
import type { PostAiIngredientRecommendResponseDto } from '@/types/ingredient';

export const aiIngredientRecommendHandler = [
  mswHttp.post('/api/ingredient/ai-ingredient-recommend', async () => {
    // 2초 딜레이 줘서 로딩 중(스켈레톤 UI) 보이게 -> 나중에 삭제해야함
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return HttpResponse.json<
      SuccessResponse<PostAiIngredientRecommendResponseDto>
    >(
      {
        success: true,
        data: {
          ingredients: [
            { ingredientId: '1', name: '딸기', amount: '200', unit: 'g' },
            { ingredientId: '2', name: '우유', amount: '120', unit: 'ml' },
            { ingredientId: '4', name: '연유', amount: '5', unit: 'ml' },
            { ingredientId: '5', name: '얼음', amount: '100', unit: 'g' },
          ],
        },
        message: '식재료 추천 성공',
      },
      { status: 200 },
    );
  }),
];
