import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { menuKeys } from './keys';

const createMenuDetailQueryOption =
  <T>(
    key: Extract<
      keyof typeof menuKeys,
      'menuSalesRank' | 'ingredientConsumptionRank'
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
};
