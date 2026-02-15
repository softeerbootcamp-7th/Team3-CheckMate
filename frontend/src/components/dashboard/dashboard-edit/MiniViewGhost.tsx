import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { useEditCardContext, useGridCellSize } from '@/hooks/dashboard';
import { cn } from '@/utils/shared';

export const MiniViewGhost = () => {
  const { dragState, ghost, isOverList } = useEditCardContext();
  const { getGridPosition, getGridCardSize } = useGridCellSize();

  if (!dragState || !ghost || isOverList) {
    return null;
  }

  const draggingCardDef =
    DASHBOARD_METRIC_CARDS[dragState.draggingCard.cardCode];

  const { rowPx, colPx } = getGridPosition(ghost.rowNo, ghost.colNo);
  const { widthPx, heightPx } = getGridCardSize(
    draggingCardDef.sizeX,
    draggingCardDef.sizeY,
  );

  return (
    <div
      className={cn(
        'rounded-400 pointer-events-none absolute opacity-50 transition-all duration-200',
        ghost.isValid ? 'bg-brand-main' : 'bg-others-negative',
      )}
      style={{
        left: colPx,
        top: rowPx,
        width: widthPx,
        height: heightPx,
      }}
    />
  );
};
