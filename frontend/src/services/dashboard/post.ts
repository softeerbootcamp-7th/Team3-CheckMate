import type {
  PostDashboardRequestDto,
  PostDashboardResponseDto,
  PostDashboardSseSubscriptionRequestDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 추가
 */
export const postDashboard = async (body: PostDashboardRequestDto) => {
  const { data } = await authorizedApi.post<PostDashboardResponseDto>(
    '/api/analysis/dashboards',
    {
      body: JSON.stringify(body),
    },
  );
  return data;
};

export const postDashboardSseSubscription = async (
  body: PostDashboardSseSubscriptionRequestDto,
) => {
  await authorizedApi.post('/api/sse/subscriptions', {
    body: JSON.stringify(body),
  });
};
