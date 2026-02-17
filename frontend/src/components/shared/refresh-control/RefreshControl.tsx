import { RotateCw } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn, formatDateYYMMDDHHMM } from '@/utils/shared';

// 데이터 새로고침된 시간과 새로고침 버튼이 있는 컴포넌트
interface RefreshControlProps {
  lastUpdatedDate: Date | null; // 마지막으로 데이터가 새로고침된 시간
  onRefresh: () => void; // 새로고침 버튼 클릭 시 호출되는 함수
  isLoading: boolean; // 데이터가 새로고침 중인지 여부
}
export const RefreshControl = ({
  lastUpdatedDate,
  onRefresh,
  isLoading,
}: RefreshControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="body-small-medium text-grey-500">
        {isLoading
          ? '데이터를 불러오는 중입니다'
          : lastUpdatedDate
            ? `${formatDateYYMMDDHHMM(lastUpdatedDate)}에 새로고침`
            : '업데이트 시간 정보가 없습니다'}
      </span>
      <Button
        className="rounded-unlimit bg-grey-300 flex h-fit! items-center justify-center p-0.5!"
        onClick={onRefresh}
        disabled={isLoading} // 새로고침 중일 때 버튼 비활성화
        aria-label="데이터 새로고침 버튼"
      >
        <RotateCw
          className={cn('text-brand-500 size-3', isLoading && 'animate-spin')} // 로딩중이면 빙그르르 돌게
        />
      </Button>
    </div>
  );
};
