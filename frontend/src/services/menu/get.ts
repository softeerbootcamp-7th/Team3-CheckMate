import type { GetMenuListResponseDto } from '@/types/menu';

import { authorizedApi } from '../shared';

export const getMenuList = async () => {
  const { data } =
    await authorizedApi.get<GetMenuListResponseDto>('/api/menus');
  return data;
};
