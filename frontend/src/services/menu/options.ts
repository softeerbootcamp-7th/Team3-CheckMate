import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { menuKeys } from './keys';

const createMenuDetailQueryOption =
  <T>(
    key: Extract<
      keyof typeof menuKeys,
      'menuSalesRank' | 'ingredientConsumptionRank' | 'menuCombinationRank'
    >,
  ) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: menuKeys[key](query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const menuOptions = {
  menuSalesRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>('menuSalesRank')(query),
  ingredientConsumptionRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>('ingredientConsumptionRank')(query),
  menuCombinationRank: <T>(query: GetAnalysisDetailQuery) =>
    createMenuDetailQueryOption<T>('menuCombinationRank')(query),
};
