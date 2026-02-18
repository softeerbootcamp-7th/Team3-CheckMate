import { HttpResponse } from 'msw';

import { type ErrorResponse, type SuccessResponse } from '@/services/shared';
import type { GetCategoryMenusResponseDto } from '@/types/ingredient';
import type { GetMenuIngredientsResponseDto } from '@/types/ingredient/dto';

import { CATEGORY_MENUS, INGREDIENTS_BY_MENU_ID } from '../data/ingredient';
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
  // 각 메뉴 별 등록된 식자재 조회 핸들러
  mswHttp.get('/api/menus/:menuId/recipe', ({ params }) => {
    const menuId = Number(params.menuId);

    const response = INGREDIENTS_BY_MENU_ID[menuId];
    if (!response) {
      return HttpResponse.json<ErrorResponse>(
        {
          success: false,
          message: 'Not Found',
          errorCode: '404',
        },
        { status: 404 },
      );
    }
    return HttpResponse.json<SuccessResponse<GetMenuIngredientsResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: response,
      },
      {
        status: 200,
      },
    );
  }),
];

export const ingredientHandler = [...getHandler];
