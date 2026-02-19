import { type PropsWithChildren, useRef, useState } from 'react';

import { EditCardContext } from '@/constants/dashboard/editCardContext';
import type { DashboardCard, DragState, GhostState } from '@/types/dashboard';

export const EditCardProvider = ({ children }: PropsWithChildren) => {
  // TODO: 초기 그리드 상태 서버에서 받아오기
  const initPlacedCards: DashboardCard[] = [];

  // 카드 그리드 상태
  const [placedCards, setPlacedCards] =
    useState<DashboardCard[]>(initPlacedCards);

  // 드래그앤드랍 관련 상태
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [ghost, setGhost] = useState<GhostState | null>(null);
  const [tempLayout, setTempLayout] = useState<DashboardCard[] | null>(null);
  const [isOverList, setIsOverList] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <EditCardContext.Provider
      value={{
        initPlacedCards,
        placedCards,
        setPlacedCards,
        gridRef,
        dragState,
        setDragState,
        ghost,
        setGhost,
        tempLayout,
        setTempLayout,
        isOverList,
        setIsOverList,
      }}
    >
      {children}
    </EditCardContext.Provider>
  );
};
