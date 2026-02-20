import { queryOptions } from '@tanstack/react-query';

import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { getAnalysisDetail } from '../analysis';

import { getDashboardCardList, getDashboardList } from './get';
import { dashboardKeys } from './keys';

export const dashboardOptions = {
  list: queryOptions({
    queryKey: dashboardKeys.list(),
    queryFn: getDashboardList,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
  }),
  cardList: (dashboardId: number) =>
    queryOptions({
      queryKey: dashboardKeys.cards(dashboardId),
      queryFn: () => getDashboardCardList({ dashboardId }),
      staleTime: 24 * 60 * 60 * 1000, // 24시간
    }),
  cardDetail: <T>(dashboardId: number, query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: dashboardKeys.cardDetail(dashboardId, query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
};
