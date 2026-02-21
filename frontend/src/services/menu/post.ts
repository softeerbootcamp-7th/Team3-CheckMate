import type { PostMenusRequestDto, PostOrderRequestDto } from '@/types/menu';

import { authorizedApi } from '../shared';

export const postMenus = async (body: PostMenusRequestDto) => {
  const { data } = await authorizedApi.post('/api/menus', {
    body: JSON.stringify(body),
  });
  return data;
};

export const postOrder = async (body: PostOrderRequestDto) => {
  await authorizedApi.post('/api/orders', {
    body: JSON.stringify(body),
  });
};
