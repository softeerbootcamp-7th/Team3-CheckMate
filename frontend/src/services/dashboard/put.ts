import type {
  PutDashboardCardListQuery,
  PutDashboardCardListRequestDto,
  PutDashboardCardListResponseDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

export const putDashboardCards = async (
  query: PutDashboardCardListQuery,
  request: PutDashboardCardListRequestDto,
) => {
  const { dashboardId } = query;

  const { data } = await authorizedApi.put<PutDashboardCardListResponseDto>(
    `/api/analysis/dashboards/${dashboardId}/layout`,
    {
      body: JSON.stringify(request),
    },
  );

  return data;
};
