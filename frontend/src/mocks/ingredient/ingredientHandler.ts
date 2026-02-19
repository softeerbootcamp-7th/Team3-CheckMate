import { HttpResponse } from 'msw';

import { type ErrorResponse, type SuccessResponse } from '@/services/shared';
import type { GetCategoryMenusResponseDto } from '@/types/ingredient';
import type {
  GetMenuIngredientsResponseDto,
  PostIngredientRegisterRequestDto,
} from '@/types/ingredient/dto';

import { CATEGORY_MENUS, INGREDIENTS_BY_MENU_ID } from '../data/ingredient';
import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/api/menus', () => {
    const data = CATEGORY_MENUS.map((category) => ({
      ...category,
      menus: category.menus.map((menu) => ({
        ...menu,
        hasIngredients:
          (INGREDIENTS_BY_MENU_ID[menu.menuId]?.ingredients.length ?? 0) > 0,
      })),
    }));

    return HttpResponse.json<SuccessResponse<GetCategoryMenusResponseDto>>(
      {
        success: true,
        message: 'Success',
        data,
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

  // 메뉴에 식자재 등록
  mswHttp.post(
    '/api/menus/:menuId/ingredients',
    async ({ params, request }) => {
      const menuId = Number(params.menuId);

      let body: PostIngredientRegisterRequestDto;

      try {
        body = (await request.json()) as PostIngredientRegisterRequestDto;
      } catch {
        return HttpResponse.json<ErrorResponse>(
          {
            success: false,
            message: '요청 body가 JSON 형식이 아닙니다.',
            errorCode: '400',
          },
          {
            status: 400,
          },
        );
      }

      // 저장(등록)
      INGREDIENTS_BY_MENU_ID[menuId].ingredients = body.ingredients;

      // 응답 형태는 너희 백엔드 스펙에 맞춰 조정하면 됨
      return HttpResponse.json<SuccessResponse>(
        {
          success: true,
          message: 'Success',
          data: {},
        },
        {
          status: 201,
        },
      );
    },
  ),
];

export const ingredientHandler = [...getHandler];
