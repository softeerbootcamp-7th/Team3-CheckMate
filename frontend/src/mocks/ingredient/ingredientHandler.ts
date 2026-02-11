import { HttpResponse } from 'msw';

import { type SuccessResponse } from '@/services/shared';
import type { GetRegisteredMenusDto } from '@/types/ingredient';

import { MENUS } from '../data/ingredient';
import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/api/ingredient/registered-menus', () => {
    return HttpResponse.json<SuccessResponse<GetRegisteredMenusDto>>(
      {
        success: true,
        message: 'Success',
        data: {
          menus: MENUS,
        },
      },
      {
        status: 200,
      },
    );
  }),
];

export const ingredientHandler = [...getHandler];
