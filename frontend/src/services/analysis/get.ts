import type { GetAnalysisDetailQuery } from '@/types/analysis';

import { authorizedApi } from '../shared';

export const getAnalysisDetail = async <T>(query: GetAnalysisDetailQuery) => {
  const queryParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    if (key === 'from' || key === 'to') {
      // 날짜는 yyyy-mm-dd 형식으로 변환해서 보내야함
      value = new Date(value).toISOString().split('T')[0];
    }
    queryParams.set(key, String(value));
  });

  const queryString = queryParams.toString();

  const path = queryString
    ? `/api/analysis/detail?${queryString}`
    : '/api/analysis/detail';

  const { data } = await authorizedApi.get<T>(path);

  return data;
};
