import { CircleCheck } from 'lucide-react';

import { cn } from '@/utils/shared';

// 이미 대시보드에 추가된 카드의 경우 위에 나타내는 오버레이 컴포넌트
export const AddedCardOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-[10px] flex items-center justify-center">
      <div
        className={cn(
          'caption-large-semibold rounded-unlimit flex gap-1 border border-gray-200 bg-gray-100 py-1 pr-2 pl-[10px] text-center text-gray-900',
        )}
      >
        대시보드 추가
        <CircleCheck className="size-4 fill-gray-900 text-gray-50" />
      </div>
    </div>
  );
};
