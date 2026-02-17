import { useCallback, useState } from 'react';

import {
  type QueryKey,
  useIsFetching,
  useQueryClient,
} from '@tanstack/react-query';

interface UseSectionRefreshProps {
  prefixKey: QueryKey; // tanstack Query의 섹션별 prefixKey
  initLastUpdatedNow?: boolean; // 첫 렌더에서 지금 시각을 새로고침된 시간으로 보이게 할 지
}
export const useSectionRefresh = ({
  prefixKey,
  initLastUpdatedNow = true,
}: UseSectionRefreshProps) => {
  const queryClient = useQueryClient();

  // 마지막 새로고침 시간
  const [lastUpdatedDate, setLastUpdatedDate] = useState<Date | null>(
    initLastUpdatedNow ? new Date() : null, // 첫 렌더에서 지금 시각을 새로고침된 시간으로 보이게 한다고 하면
  );

  // 마지막 새로고침 시간을 현재 시간으로 업데이트하는 함수
  const updateLastUpdatedDateToNow = useCallback(() => {
    setLastUpdatedDate(new Date());
  }, []);

  // 섹션 내 카드들 중 데이터 불러오고 있는(새로고침버튼 or 기간변경으로) 개수. 0 이상이면 현재 fetching 중인 카드 있다는 뜻
  const fetchingCardsCount = useIsFetching({ queryKey: prefixKey });
  const isFetching = fetchingCardsCount > 0;

  // 새로고침 버튼 눌렀을 때 작동할 함수
  const refresh = useCallback(async () => {
    // 새로고침 요청 시각(=헤더 표시)을 새로고침 버튼 누른 현재로 업데이트
    setLastUpdatedDate(new Date());

    // prefixKey로 시작하는 모든 쿼리(=섹션 내 하위 카드들) refetch시킴
    await queryClient.refetchQueries({
      queryKey: prefixKey,
      type: 'active', // 현재 화면에 선택된 기간에 해당하는 쿼리만 refetch 되도록
    });
  }, [queryClient, prefixKey]);

  return {
    lastUpdatedDate,
    isFetching,
    refresh,
    updateLastUpdatedDateToNow,
  };
};
