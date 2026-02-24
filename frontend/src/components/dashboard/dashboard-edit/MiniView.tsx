import { useLocation } from 'react-router-dom';

import { GRID_COL_SIZE, GRID_ROW_SIZE } from '@/constants/dashboard';
import { useDragAndDropCard, useEditCardContext } from '@/hooks/dashboard';

import { MiniViewActiveCard } from './MiniViewActiveCard';
import { MiniViewEmptyCard } from './MiniViewEmptyCard';
import { MiniViewGhost } from './MiniViewGhost';

export const MiniView = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const title = searchParams.get('tab') || '알 수 없음';

  const { gridRef, dragState, simulatedLayout, realLayout } =
    useEditCardContext();
  const { handleGridDragOver, handleGridDragLeave, handleGridDrop } =
    useDragAndDropCard();

  return (
    <section className="flex min-w-120 grow flex-col overflow-y-auto p-6.25 pt-20">
      <header className="mb-20 pl-5">
        <h1 className="title-large-bold text-grey-900">{title}</h1>
      </header>
      <div
        className="relative mx-auto min-h-[410.4px] min-w-153"
        ref={gridRef}
        onDragOver={handleGridDragOver}
        onDragLeave={handleGridDragLeave}
        onDrop={handleGridDrop}
      >
        {/* 그리드 셀 가이드라인 */}
        <div className="grid h-full grow grid-cols-3 grid-rows-3 gap-3">
          {Array.from({ length: GRID_ROW_SIZE * GRID_COL_SIZE }).map(
            (_, index) => (
              <MiniViewEmptyCard key={`grid-${index}`} />
            ),
          )}
        </div>

        {/* 활성 카드 */}
        {(simulatedLayout || realLayout).map((card) => {
          const isDragging = dragState?.draggingCard.cardCode === card.cardCode;
          return (
            <MiniViewActiveCard
              key={`mini-${card.cardCode}`}
              cardCode={card.cardCode}
              colNo={card.colNo}
              rowNo={card.rowNo}
              isDragging={isDragging}
            />
          );
        })}

        <MiniViewGhost />
      </div>
    </section>
  );
};
