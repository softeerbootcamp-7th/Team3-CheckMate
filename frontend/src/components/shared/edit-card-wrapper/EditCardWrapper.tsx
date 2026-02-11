import type { ReactNode } from 'react';

import { CircleCheck } from 'lucide-react';

import { EDIT_CARD_WRAPPER } from '@/constants/shared';
import { useEditCardWrapperMeasure } from '@/hooks/shared/edit-card-wrapper';
import { cn } from '@/utils/shared';

import { PeriodTag } from './PeriodTag';
import { PlusIconButton } from './PlusIconButton';
import { TrashCanIconButton } from './TrashCanIconButton';

// 대시보드 편집 패널 카드로 만들어주는 wrapper 컴포넌트
// child에는 순수한 카드 내용만 넣어준다
interface EditCardWrapperProps {
  isAdded: boolean;
  children: ReactNode;
  className?: string; // 전체 wrapper 크기나 보더 등 스타일
  period: string; // 오늘, 이번주, 이번달 등 문구
  sizeX?: number; // 가로 크기
  sizeY?: number; // 세로 크기
  onClickDeleteButton?: () => void; // 대시보드에서 삭제하는 버튼 클릭 헨들러
  onClickAddButton?: () => void; // 대시보드에 추가하는 버튼 클릭 핸들러
}

export const EditCardWrapper = ({
  isAdded,
  children,
  className,
  sizeX = 1,
  sizeY = 1,
  period = '기간없음',
  onClickDeleteButton,
  onClickAddButton,
}: EditCardWrapperProps) => {
  const { childRef, computedCardWidth, computedCardHeight } =
    useEditCardWrapperMeasure({
      scale: EDIT_CARD_WRAPPER.CHANGE_SCALE,
      wrapperPadding: EDIT_CARD_WRAPPER.PADDING_SIZE,
      headerHeight: EDIT_CARD_WRAPPER.HEADER_HEIGHT,
      headerGap: EDIT_CARD_WRAPPER.HEADER_MAIN_GAP,
    });

  return (
    <div
      style={{
        width:
          Math.max(EDIT_CARD_WRAPPER.MIN_WIDTH, computedCardWidth) * sizeX +
          20 * (sizeX - 1), // 최소 너비 220px, gap 20px
        height:
          Math.max(EDIT_CARD_WRAPPER.MIN_HEIGHT, computedCardHeight) * sizeY +
          20 * (sizeY - 1), // 최소 높이 147px, gap 20px
      }}
      className={cn(
        'bg-special-card-bg rounded-400 border-grey-300 relative flex flex-col overflow-hidden border p-3',
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
        style={{ marginTop: `${EDIT_CARD_WRAPPER.HEADER_MAIN_GAP}px` }}
        className="flex min-w-0 flex-1 items-end justify-center"
      >
        <div
          style={{
            transform: `scale(${EDIT_CARD_WRAPPER.CHANGE_SCALE})`,
            transformOrigin:
              computedCardHeight < EDIT_CARD_WRAPPER.MIN_HEIGHT
                ? 'center'
                : 'top',
          }}
          ref={childRef}
          className={cn(isAdded ? 'opacity-10' : 'opacity-100')}
        >
          {children}
        </div>
      </div>

      {isAdded && (
        <div className="pointer-events-none absolute inset-2.5 flex items-center justify-center">
          <div
            className={cn(
              'caption-large-semibold rounded-unlimit border-grey-200 bg-grey-100 text-grey-900 flex gap-1 border py-1 pr-2 pl-2.5 text-center',
            )}
          >
            대시보드 추가
            <CircleCheck className="fill-grey-900 text-grey-50 size-4" />
          </div>
        </div>
      )}
    </div>
  );
};
