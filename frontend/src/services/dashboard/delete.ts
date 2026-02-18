import type {
  DeleteDashboardQuery,
  DeleteDashboardSseSubscriptionRequestDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 삭제
 */
export const deleteDashboard = async (query: DeleteDashboardQuery) => {
  const { dashboardId } = query;

  const { data } = await authorizedApi.delete(
    `/api/analysis/dashboards/${dashboardId}`,
  );

  return data;
};

export const deleteDashboardSseSubscription = async (
  body: DeleteDashboardSseSubscriptionRequestDto,
) => {
  await authorizedApi.delete('/api/sse/subscriptions', {
    body: JSON.stringify(body),
  });
};
