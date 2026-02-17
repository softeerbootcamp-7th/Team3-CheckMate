import { queryOptions } from '@tanstack/react-query';

import { getDashboardCardList, getDashboardList } from './get';
import { dashboardKeys } from './keys';

export const dashboardOptions = {
  dashboards: queryOptions({
    queryKey: dashboardKeys.all,
    queryFn: getDashboardList,
  }),
  cards: (dashboardId: number) =>
    queryOptions({
      queryKey: dashboardKeys.cards(dashboardId),
      queryFn: () => getDashboardCardList({ dashboardId }),
    }),
};
