import type {
  GetDashboardCardListParam,
  GetDashboardCardListResponseDto,
  GetDashboardListResponseDto,
} from '@/types/dashboard';

import { authorizedApi } from '../shared';

/**
 * 대시보드 탭 목록 조회
 */
export const getDashboardList = async () => {
  const { data } = await authorizedApi.get<GetDashboardListResponseDto>(
    '/api/analysis/dashboards',
  );
  return data;
};

/**
 * 특정 대시보드 레이아웃 조회
 */
export const getDashboardCardList = async (
  param: GetDashboardCardListParam,
) => {
  const { dashboardId } = param;

  const { data } = await authorizedApi.get<GetDashboardCardListResponseDto>(
    `/api/analysis/dashboards/${dashboardId}/layout`,
  );

  return data;
};
