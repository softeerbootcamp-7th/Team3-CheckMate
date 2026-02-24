import { useCallback, useMemo } from 'react';

import {
  type QueryKey,
  useIsFetching,
  useQueryClient,
} from '@tanstack/react-query';

interface UseCardRefreshProps {
  prefixKey: QueryKey;
  initLastUpdatedNow?: boolean;
}
export const useCardRefresh = ({ prefixKey }: UseCardRefreshProps) => {
  const queryClient = useQueryClient();

  // 현재 데이터 패칭 중인지 확인
  const isFetching =
    useIsFetching({
      queryKey: prefixKey,
      exact: true,
    }) > 0;

  // 해당 쿼리의 마지막 업데이트 시간
  const lastUpdatedDate = useMemo(() => {
    const queryState = queryClient.getQueryState(prefixKey);
    const updatedAt = queryState?.dataUpdatedAt;
    if (isFetching) {
      // 패칭 중에는 이전 데이터 내보내기
      return updatedAt ? new Date(updatedAt) : null;
    }

    if (updatedAt) {
      return new Date(updatedAt);
    }

    return null;
  }, [queryClient, prefixKey, isFetching]);

  // 쿼리 키에 해당하는 데이터 새로고침
  const refresh = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: prefixKey,
    });
  }, [queryClient, prefixKey]);

  return {
    lastUpdatedDate,
    isFetching,
    refresh,
  };
};
