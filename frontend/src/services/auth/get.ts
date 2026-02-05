import type {
  GetAuthGoogleQuery,
  GetAuthGoogleResponseDto,
  GetAuthStatusResponseDto,
} from '@/types/auth';

import { authorizedApi, basicApi } from '../shared';

export const getAuthGoogle = async (query: GetAuthGoogleQuery) => {
  const queryParams = new URLSearchParams({
    ...query,
  }).toString();

  const { data } = await basicApi.get<GetAuthGoogleResponseDto>(
    `/auth/google/callback?${queryParams}`,
  );
  return data;
};

export const getAuthStatus = async () => {
  const { data } =
    await authorizedApi.get<GetAuthStatusResponseDto>('/auth/status');
  return data;
};
