import { type QueryKey, queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { getMenuList } from './get';
import { menuKeys } from './keys';

const createMenuDetailQueryOption =
  <T>(key: (q: GetAnalysisDetailQuery) => QueryKey) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: key(query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const menuOptions = {
  menuSalesRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>(menuKeys.menuSalesRank)(query),
  categorySales: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>(menuKeys.categorySales)(query),
  ingredientConsumptionRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>(menuKeys.ingredientConsumptionRank)(query),
  menuCombinationRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>(menuKeys.menuCombinationRank)(query),
  timeSlotMenuOrderCount: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>(menuKeys.timeSlotMenuOrderCount)(query),
  list: () =>
    queryOptions({
      queryKey: menuKeys.list(),
      queryFn: () => getMenuList(),
    }),
};
