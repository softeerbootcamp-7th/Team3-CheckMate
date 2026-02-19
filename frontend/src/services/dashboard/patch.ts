import type {
  PatchDashboardNameParam,
  PatchDashboardNameRequestDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 이름 변경
 */
export const patchDashboardName = async (
  param: PatchDashboardNameParam,
  body: PatchDashboardNameRequestDto,
) => {
  const { dashboardId } = param;

  const { data } = await authorizedApi.patch<PatchDashboardNameRequestDto>(
    `/api/analysis/dashboards/${dashboardId}/name`,
    {
      body: JSON.stringify(body),
    },
  );
  return data;
};
