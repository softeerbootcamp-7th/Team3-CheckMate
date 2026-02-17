import type { DeleteDashboardQuery } from '@/types/dashboard';

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
