import type { QueryKey } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';

import { useCardRefresh } from '@/hooks/shared';
import { cn } from '@/utils/shared';
import { formatTimeHHMM } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface RefreshedTimeButtonProps {
  queryKey: QueryKey; // 해당 지표카드의 쿼리 키
}

export const RefreshedTimeButton = ({ queryKey }: RefreshedTimeButtonProps) => {
  const { lastUpdatedDate, isFetching, refresh } = useCardRefresh({
    prefixKey: queryKey,
    initLastUpdatedNow: false, // 첫 렌더에서 지금 시각을 새로고침된 시간으로 보이지 않게 설정
  });
  return (
    <div className="flex flex-col items-end pb-px">
      <div className="bg-grey-100 mt-5 mb-3 h-px w-full px-2" />
      <div className="flex shrink-0 items-center gap-2">
        <span className="caption-large-medium text-grey-400">
          {lastUpdatedDate
            ? `${formatTimeHHMM(lastUpdatedDate)} 업데이트`
            : '업데이트 시간 정보 없음'}
        </span>
        <Button
          className="rounded-unlimit hover:border-grey-900 flex h-fit! items-center justify-center border border-transparent p-0.5!"
          onClick={refresh}
          disabled={isFetching} // 새로고침 중일 때 버튼 비활성화
          aria-label="데이터 새로고침 버튼"
        >
          <RefreshCcw
            key={lastUpdatedDate?.toString()} // lastUpdatedDate가 변경될 때마다 아이콘이 재마운트되도록 key로 사용
            className={cn('text-grey-400 animate-spin-once size-3 rotate-90')} // 재마운트 될 때 마다 한 번 회전하는 애니메이션 적용
          />
        </Button>
      </div>
    </div>
  );
};
