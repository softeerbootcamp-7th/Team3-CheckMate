import type {
  PostDashboardRequestDto,
  PostDashboardResponseDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 추가
 */
export const postDashboard = async (request: PostDashboardRequestDto) => {
  const { data } = await authorizedApi.post<PostDashboardResponseDto>(
    '/api/analysis/dashboards',
    {
      body: JSON.stringify(request),
    },
  );
  return data;
};
