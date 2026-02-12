import type { GetRegisteredMenusDto } from '@/types/ingredient';

import { authorizedApi } from '../shared';

export const getRegisteredMenus = async () => {
  const { data } = await authorizedApi.get<GetRegisteredMenusDto>(
    '/api/ingredient/registered-menus',
  );

  return data;
};
