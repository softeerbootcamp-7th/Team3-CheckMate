import type { PostAuthRefreshResponseDto } from '@/types/auth';

import { authorizedApi, basicApi } from '../shared';

export const postAuthRefresh = async () => {
  const { data } =
    await basicApi.post<PostAuthRefreshResponseDto>('/auth/refresh');
  return data;
};

export const postSignOut = async () => {
  await authorizedApi.post('/auth/logout');
};
