import { HttpResponse } from 'msw';

import { type SuccessResponse } from '@/services/shared';
import type { GetCategoryMenusResponseDto } from '@/types/ingredient';

import { CATEGORY_MENUS } from '../data/ingredient';
import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/api/menus', () => {
    return HttpResponse.json<SuccessResponse<GetCategoryMenusResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: CATEGORY_MENUS,
      },
      {
        status: 200,
      },
    );
  }),
];

export const ingredientHandler = [...getHandler];
