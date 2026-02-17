import type {
  PatchDashboardNameQuery,
  PatchDashboardNameRequestDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 이름 변경
 */
export const patchDashboard = async (
  query: PatchDashboardNameQuery,
  request: PatchDashboardNameRequestDto,
) => {
  const { dashboardId } = query;

  const { data } = await authorizedApi.patch<PatchDashboardNameRequestDto>(
    `/api/analysis/dashboards/${dashboardId}/name`,
    {
      body: JSON.stringify(request),
    },
  );
  return data;
};
