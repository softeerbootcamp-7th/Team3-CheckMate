import { useCallback } from 'react';

import { XIcon } from 'lucide-react';

import { PeriodTag } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import {
  DASHBOARD_EDIT_AREA,
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';
import { CDN_BASE_URL } from '@/constants/shared';
import {
  useDragAndDropCard,
  useEditCard,
  useGridCellSize,
} from '@/hooks/dashboard';
import { cn } from '@/utils/shared';

interface MiniViewActiveCardProps {
  cardCode: MetricCardCode;
  colNo: number;
  rowNo: number;
  isDragging: boolean;
}
export const MiniViewActiveCard = ({
  cardCode,
  colNo,
  rowNo,
  isDragging,
}: MiniViewActiveCardProps) => {
  const { removeCard } = useEditCard();
  const { handleDragStart, handleDragEnd } = useDragAndDropCard();
  const { getGridPosition, getGridCardSize } = useGridCellSize();

  const card = DASHBOARD_METRIC_CARDS[cardCode];

  const handleRemove = useCallback(
    () => removeCard(cardCode),
    [removeCard, cardCode],
  );

  if (!card) {
    // 카드 정보가 없는 경우 렌더링하지 않음
    return null;
  }
  const { label, type, period, sizeX, sizeY } = card;

  const { topInPixel, leftInPixel } = getGridPosition(rowNo, colNo);
  const { widthInPixel, heightInPixel } = getGridCardSize(sizeX, sizeY);

  return (
    <div
      draggable
      onDragStart={(e) =>
        handleDragStart(e, DASHBOARD_EDIT_AREA.GRID, {
          cardCode,
          colNo,
          rowNo,
        })
      }
      onDragEnd={handleDragEnd}
      className={cn(
        'rounded-300 bg-grey-0 absolute top-0 left-0 cursor-grab border-none transition-all duration-200 select-none active:cursor-grabbing',
        isDragging ? 'opacity-0' : 'opacity-100',
      )}
      style={{
        translate: `${leftInPixel}px ${topInPixel}px`,
        width: widthInPixel,
        height: heightInPixel,
      }}
    >
      <div className="relative flex h-full flex-col items-center justify-center p-4">
        <img
          src={`${CDN_BASE_URL}/assets/images/${type}.svg`}
          alt={`${label} 미니 뷰`}
          draggable={false}
        />
        <p className="body-small-medium text-grey-900 mt-200 mb-100 text-center break-keep">
          {label}
        </p>
        <PeriodTag isAdded period={period} />
      </div>
      {/* 상단 삭제 버튼 */}
      <Button
        className="bg-grey-100 text-grey-700 rounded-unlimit hover:border-grey-700 active:bg-grey-900 active:text-grey-50 absolute top-2.5 right-2.5 size-6 p-0! hover:border"
        onClick={handleRemove}
      >
        <XIcon className="size-5" />
      </Button>
    </div>
  );
};
