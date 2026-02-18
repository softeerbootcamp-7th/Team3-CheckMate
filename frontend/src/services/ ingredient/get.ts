import type { GetCategoryMenusResponseDto } from '@/types/ingredient';

import { authorizedApi } from '../shared';

export const getRegisteredMenus = async () => {
  const { data } =
    await authorizedApi.get<GetCategoryMenusResponseDto>('/api/menus');

  return data;
};
