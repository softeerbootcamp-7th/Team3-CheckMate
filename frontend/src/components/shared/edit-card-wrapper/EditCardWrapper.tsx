import { CircleCheck } from 'lucide-react';

import { useEditCardWrapperMeasure } from '@/hooks/shared/edit-card-wrapper/useEditCardWrapperMeasure';
import { cn } from '@/utils/shared';

import { PeriodTag } from './PeriodTag';
import { PlusIconButton } from './PlusIconButton';
import { TrashCanIconButton } from './TrashCanIconButton';

// 대시보드 편집 패널 카드로 만들어주는 wrapper 컴포넌트
// child에는 순수한 카드 내용만 넣어준다
interface EditCardWrapperProps {
  isAdded: boolean;
  children: React.ReactNode;
  className?: string; // 전체 wrapper 크기나 보더 등 스타일
  period: string; // 오늘, 이번주, 이번달 등 문구

  onClickDeleteButton?: () => void; // 대시보드에서 삭제하는 버튼 클릭 헨들러
  onClickAddButton?: () => void; // 대시보드에 추가하는 버튼 클릭 핸들러
}

const CHANGE_SCALE = 0.65; // 65% 축소
const PADDING_SIZE = 12; // 패딩 박스 내 여백 사이즈(12px)
const HEADER_HEIGHT = 26; // 헤더 높이(위에 있는 버튼들 높이 : 26px)
const HEADER_MAIN_GAP = 16; // 헤더와 내용 사이 간격(16px)
const MIN_WIDTH = 220; // 최소 너비 220px
const MIN_HEIGHT = 147; // 최소 높이 147px

export const EditCardWrapper = ({
  isAdded,
  children,
  className,
  period = '기간없음',
  onClickDeleteButton,
  onClickAddButton,
}: EditCardWrapperProps) => {
  const { childRef, computedCardWidth, computedCardHeight } =
    useEditCardWrapperMeasure({
      scale: CHANGE_SCALE,
      wrapperPadding: PADDING_SIZE,
      headerHeight: HEADER_HEIGHT,
      headerGap: HEADER_MAIN_GAP,
    });

  return (
    <div
      style={{
        width: Math.max(MIN_WIDTH, computedCardWidth), // 최소 너비 220px
        height: Math.max(MIN_HEIGHT, computedCardHeight), // 최소 높이 147px
      }}
      className={cn(
        'bg-special-card-bg rounded-400 relative flex flex-col overflow-hidden border border-gray-300 p-3',
        className,
      )}
    >
      <div className="flex justify-between">
        <PeriodTag isAdded={isAdded} period={period} />
        {isAdded ? (
          <TrashCanIconButton onClickDeleteButton={onClickDeleteButton} />
        ) : (
          <PlusIconButton onClickAddButton={onClickAddButton} />
        )}
      </div>
      <div
        style={{ marginTop: `${HEADER_MAIN_GAP}px` }}
        className="flex min-w-0 flex-1 items-end justify-center"
      >
        <div
          style={{
            transform: `scale(${CHANGE_SCALE})`,
            transformOrigin: computedCardHeight < MIN_HEIGHT ? 'center' : 'top',
          }}
          ref={childRef}
          className={cn(isAdded ? 'opacity-10' : 'opacity-100')}
        >
          {children}
        </div>
      </div>

      {isAdded && (
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
      )}
    </div>
  );
};
