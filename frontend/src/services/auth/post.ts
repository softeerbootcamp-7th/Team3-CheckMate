import type { PostAuthRefreshResponseDto } from '@/types/auth';

import { basicApi } from '../shared';

export const postAuthRefresh = async () => {
  const { data } =
    await basicApi.post<PostAuthRefreshResponseDto>('/auth/refresh');
  return data;
};
