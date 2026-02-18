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
        'rounded-400 pointer-events-none absolute top-0 left-0 shadow-[2px_2px_8px_0_rgba(0,0,0,0.15)_inset] transition-all duration-200',
        ghost.isValid ? 'bg-grey-200' : 'bg-others-negative opacity-40',
      )}
      style={{
        translate: `${colPx}px ${rowPx}px`,
        width: widthPx,
        height: heightPx,
      }}
    />
  );
};
