import { queryOptions } from '@tanstack/react-query';

import { getDashboardCardList, getDashboardList } from './get';
import { dashboardKeys } from './keys';

export const dashboardOptions = {
  list: queryOptions({
    queryKey: dashboardKeys.all,
    queryFn: getDashboardList,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
  }),
  cardList: (dashboardId: number) =>
    queryOptions({
      queryKey: dashboardKeys.cards(dashboardId),
      queryFn: () => getDashboardCardList({ dashboardId }),
      staleTime: 24 * 60 * 60 * 1000, // 24시간
    }),
};
