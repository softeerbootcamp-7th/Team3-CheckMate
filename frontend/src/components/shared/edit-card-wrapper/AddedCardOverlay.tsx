import { CircleCheck } from 'lucide-react';

import { cn } from '@/utils/shared';

// 이미 대시보드에 추가된 카드의 경우 위에 나타내는 오버레이 컴포넌트
export const AddedCardOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-3 flex items-center justify-center">
      <div
        className={cn(
          'caption-large-semibold rounded-unlimit border-grey-200 bg-grey-100 text-grey-900 flex gap-1 border py-1 pr-2 pl-2.5 text-center',
        )}
      >
        대시보드 추가
        <CircleCheck className="fill-grey-900 text-grey-50 size-4" />
      </div>
    </div>
  );
};
