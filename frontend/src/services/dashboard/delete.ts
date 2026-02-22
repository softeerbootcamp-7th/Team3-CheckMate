import type { DeleteDashboardParam } from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 삭제
 */
export const deleteDashboard = async (param: DeleteDashboardParam) => {
  const { dashboardId } = param;

  const { data } = await authorizedApi.delete(
    `/api/analysis/dashboards/${dashboardId}`,
  );

  return data;
};
