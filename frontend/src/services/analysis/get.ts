import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { authorizedApi } from '../shared';

export const getAnalysisDetail = async <T>(query: GetAnalysisDetailQuery) => {
  const queryParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    queryParams.set(key, String(value));
  });

  const queryString = queryParams.toString();

  const path = `/api/analysis/detail?${queryString}`;

  const { data } = await authorizedApi.get<T>(path);

  return data;
};
