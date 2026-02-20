import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { menuKeys } from './keys';

export const menuOptions = {
  menuSalesRank: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: menuKeys.menuSalesRank(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
};
