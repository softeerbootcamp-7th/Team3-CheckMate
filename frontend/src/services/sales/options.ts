import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import { salesKeys } from '@/services/sales/keys';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

export const salesOptions = {
  dailyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.dailyRevenueTrend(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
};
