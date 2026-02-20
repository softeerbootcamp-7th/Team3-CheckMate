import { type PropsWithChildren, useRef, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EditCardContext } from '@/constants/dashboard/editCardContext';
import { dashboardOptions } from '@/services/dashboard';
import type { DashboardCard, DragState, GhostState } from '@/types/dashboard';

export const EditCardProvider = ({ children }: PropsWithChildren) => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  const searchParams = new URLSearchParams(window.location.search);
  const dashboardName = searchParams.get('tab') ?? undefined;
  const currentDashboard = tabs.find((tab) => tab.name === dashboardName);

  if (!currentDashboard) {
    throw new Error('존재하지 않는 대시보드입니다.');
  } else if (currentDashboard.isDefault) {
    throw new Error('기본 대시보드는 편집할 수 없습니다.');
  }

  const { data: cardList } = useSuspenseQuery(
    dashboardOptions.cardList(currentDashboard.id),
  );

  const initPlacedCards: DashboardCard[] = cardList;

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
        dashboardId: currentDashboard.id,
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
