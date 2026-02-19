import { HttpResponse } from 'msw';

import { mswHttp } from '@/mocks/shared';
import type { SuccessResponse } from '@/services/shared';
import type { PostAiIngredientRecommendResponseDto } from '@/types/ingredient';

export const aiIngredientRecommendHandler = [
  mswHttp.post('/api/menus/:menuId/auto-complete', async () => {
    // 2초 딜레이 줘서 로딩 중(스켈레톤 UI) 보이게 -> 나중에 삭제해야함
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return HttpResponse.json<
      SuccessResponse<PostAiIngredientRecommendResponseDto>
    >(
      {
        success: true,
        data: {
          menuName: '오렌지 주스',
          ingredients: [
            {
              name: '오렌지',
              quantity: 200,
              unit: 'G',
            },
            {
              name: '설탕',
              quantity: 15,
              unit: 'G',
            },
            {
              name: '물',
              quantity: 50,
              unit: 'ML',
            },
            {
              name: '레몬즙',
              quantity: 10,
              unit: 'ML',
            },
          ],
        },
        message: '식재료 추천 성공',
      },
      { status: 200 },
    );
  }),
];
