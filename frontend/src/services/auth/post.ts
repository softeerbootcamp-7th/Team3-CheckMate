import type { PostAuthRefreshResponseDto } from '@/types/auth';

import { authorizedApi } from '../shared';

export const postAuthRefresh = async () => {
  const { data } =
    await authorizedApi.post<PostAuthRefreshResponseDto>('/auth/refresh');
  return data;
};
