import type {
  PutDashboardCardListParam,
  PutDashboardCardListRequestDto,
  PutDashboardCardListResponseDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

export const putDashboardCardList = async (
  param: PutDashboardCardListParam,
  body: PutDashboardCardListRequestDto,
) => {
  const { dashboardId } = param;

  const { data } = await authorizedApi.put<PutDashboardCardListResponseDto>(
    `/api/analysis/dashboards/${dashboardId}/layout`,
    {
      body: JSON.stringify(body),
    },
  );

  return data;
};
