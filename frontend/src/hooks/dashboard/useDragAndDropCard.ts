import { useCallback } from 'react';

import {
  DASHBOARD_EDIT_AREA,
  DASHBOARD_METRIC_CARDS,
  type DashboardEditArea,
  DIRECTIONS,
  GRID_COL_SIZE,
  GRID_ROW_SIZE,
} from '@/constants/dashboard';
import type { DashboardCard } from '@/types/dashboard';
import { getConflictingCards } from '@/utils/dashboard';

import { useThrottle } from '../shared/useThrottle';

import { useEditCardContext } from './useEditCardContext';
import { useGridCellSize } from './useGridCellSize';

export const useDragAndDropCard = () => {
  const {
    realLayout,
    setRealLayout,
    gridRef,
    dragState,
    setDragState,
    ghost,
    setGhost,
    simulatedLayout,
    setSimulatedLayout,
    setIsOverList,
  } = useEditCardContext();
  const { getGridPosition, getGridCardSize } = useGridCellSize();

  /**
   * 중심점 기준 진입 방향 계산 함수
   * @param draggingCenterX 드래그 중인 카드의 중심 X 좌표 (픽셀 단위)
   * @param draggingCenterY 드래그 중인 카드의 중심 Y 좌표 (픽셀 단위)
   * @param conflictCard 충돌한 카드 정보
   * @returns 진입 방향에 따른 밀어내기 우선순위 배열 [{dx, dy}, ...]
   */
  const getPushDirectionPriority = useCallback(
    (
      draggingCenterX: number,
      draggingCenterY: number,
      conflictCard: DashboardCard,
    ) => {
      // 충돌한 요소의 중심
      const conflictCardDef = DASHBOARD_METRIC_CARDS[conflictCard.cardCode];
      const { topInPixel, leftInPixel } = getGridPosition(
        conflictCard.rowNo,
        conflictCard.colNo,
      );
      const { widthInPixel, heightInPixel } = getGridCardSize(
        conflictCardDef.sizeX,
        conflictCardDef.sizeY,
      );
      const conflictCenterX = leftInPixel + widthInPixel / 2;
      const conflictCenterY = topInPixel + heightInPixel / 2;

      // 드래그 중인 카드의 중심과 충돌 카드의 중심을 비교하여 진입 방향 계산
      const dx = draggingCenterX - conflictCenterX;
      const dy = draggingCenterY - conflictCenterY;

      const absDx = Math.abs(dx) / conflictCardDef.sizeX;
      const absDy = Math.abs(dy) / conflictCardDef.sizeY;

      // 진입방향 반대를 밀어내기 우선순위로 설정
      const { LEFT, RIGHT, UP, DOWN } = DIRECTIONS;
      if (absDx > absDy) {
        if (dx > 0) {
          // 우측 진입 -> 좌로 밀기 우선
          return [LEFT, DOWN, UP, RIGHT];
        } else {
          // 좌측 진입 -> 우로 밀기 우선
          return [RIGHT, DOWN, UP, LEFT];
        }
      } else {
        if (dy > 0) {
          // 하단 진입 -> 위로 밀기 우선
          return [UP, RIGHT, LEFT, DOWN];
        } else {
          // 상단 진입 -> 아래로 밀기 우선
          return [DOWN, RIGHT, LEFT, UP];
        }
      }
    },
    [getGridCardSize, getGridPosition],
  );

  /**
   * 카드 밀어내기 재귀 알고리즘
   * @param currentLayout 현재까지 계산된 전체 카드 배치
   * @param currentCard 방금 이동시켜서 주변을 밀어내야 할 주체 카드
   * @param movedCards 한 번 이동한 적이 있는 카드의 코드 Set (무한 루프 방지)
   * @param draggingCenterX 드래그 중인 카드의 중심 X 좌표 (픽셀 단위)
   * @param draggingCenterY 드래그 중인 카드의 중심 Y 좌표 (픽셀 단위)
   * @returns 밀어내기 결과 레이아웃과 유효 여부 {cards, isValid}
   */
  const getPushedLayout = useCallback(
    (
      currentLayout: DashboardCard[],
      currentCard: DashboardCard,
      movedCards: Set<string> = new Set(),
      draggingCenterX: number,
      draggingCenterY: number,
    ): { cards: DashboardCard[]; isValid: boolean } => {
      // 현재 조작 중인 카드를 이동 완료 목록에 추가
      movedCards.add(currentCard.cardCode);

      // 현재 레이아웃에서 movedCard 위치 업데이트
      let nextLayout = currentLayout.map((card) =>
        card.cardCode === currentCard.cardCode ? currentCard : card,
      );

      // 충돌되는 카드 찾기
      const conflicts = getConflictingCards(currentCard, nextLayout);

      for (const conflictCard of conflicts) {
        // 진입방향에 따른 밀어냄 방향 우선순위
        const pushDirections = getPushDirectionPriority(
          draggingCenterX,
          draggingCenterY,
          conflictCard,
        );

        for (const { dx, dy } of pushDirections) {
          if (movedCards.has(conflictCard.cardCode)) {
            continue; // 이미 이동한 카드면 패스
          }

          // 충돌 카드의 다음 좌표 계산
          let conflictNextX = conflictCard.colNo;
          let conflictNextY = conflictCard.rowNo;

          const conflictCardDef = DASHBOARD_METRIC_CARDS[conflictCard.cardCode];
          const currentCardDef = DASHBOARD_METRIC_CARDS[currentCard.cardCode];

          if (dx > 0) {
            // 현재 카드의 우측으로 밀어냄
            conflictNextX = currentCard.colNo + currentCardDef.sizeX;
          } else if (dx < 0) {
            // 현재 카드의 좌측으로 밀어냄
            conflictNextX = currentCard.colNo - conflictCardDef.sizeX;
          }

          if (dy > 0) {
            // 현재 카드의 하단으로 밀어냄
            conflictNextY = currentCard.rowNo + currentCardDef.sizeY;
          } else if (dy < 0) {
            // 현재 카드의 상단으로 밀어냄
            conflictNextY = currentCard.rowNo - conflictCardDef.sizeY;
          }

          // 그리드 밖으로 나간다면 무효
          if (
            conflictNextX < 1 ||
            conflictNextX + conflictCardDef.sizeX - 1 > GRID_COL_SIZE ||
            conflictNextY < 1 ||
            conflictNextY + conflictCardDef.sizeY - 1 > GRID_ROW_SIZE
          ) {
            continue;
          }

          const movedConflictCard: DashboardCard = {
            cardCode: conflictCard.cardCode,
            colNo: conflictNextX,
            rowNo: conflictNextY,
          };

          // 충돌된 카드 위치가 변했을 때 재귀적으로 밀어내기
          const pushedResult = getPushedLayout(
            nextLayout,
            movedConflictCard,
            new Set(movedCards),
            draggingCenterX,
            draggingCenterY,
          );

          if (pushedResult.isValid) {
            nextLayout = pushedResult.cards;
            break; // 유효한 방향을 찾았으므로 다른 방향 시도 중단
          }
        }
      }

      // 최종 충돌 검사
      const isFinalConflict =
        getConflictingCards(currentCard, nextLayout).length > 0;

      return { cards: nextLayout, isValid: !isFinalConflict };
    },
    [getPushDirectionPriority],
  );

  /**
   * 현재 마우스 위치를 기반으로 카드가 가장 가까운 그리드 셀에 붙도록 좌표 계산
   * 카드의 크기를 고려하여, 카드의 중심이 가장 가까운 셀의 중심에 오도록 함
   * @param clientX 마우스의 X 좌표 (픽셀 단위)
   * @param clientY 마우스의 Y 좌표 (픽셀 단위)
   * @returns 계산된 그리드 좌표 {row, col}
   */
  const calculateGridPos = useCallback(
    (clientX: number, clientY: number) => {
      if (!gridRef.current || !dragState) {
        return { row: 0, col: 0 };
      }

      // 드래그 중인 카드의 크기 계산 (픽셀단위)
      const draggingCardDef =
        DASHBOARD_METRIC_CARDS[dragState.draggingCard.cardCode];
      const cardSizeX = draggingCardDef.sizeX;
      const cardSizeY = draggingCardDef.sizeY;
      const { widthInPixel, heightInPixel } = getGridCardSize(
        cardSizeX,
        cardSizeY,
      );

      // 드래그 중인 카드의 중심점 (픽셀단위)
      const cardRect = gridRef.current.getBoundingClientRect();
      const draggingCenterX =
        clientX - cardRect.left - dragState.centerOffset.x;
      const draggingCenterY = clientY - cardRect.top - dragState.centerOffset.y;

      // 카드의 중심이 가장 가까운 셀의 중심에 오도록
      let minDistance = Infinity;
      let closest = { row: 0, col: 0 };
      // 각 그리드 셀마다 맨하탄 거리 계산
      for (let r = 1; r <= GRID_ROW_SIZE - cardSizeY + 1; r++) {
        for (let c = 1; c <= GRID_COL_SIZE - cardSizeX + 1; c++) {
          // 그리드 셀의 중심 좌표
          const { topInPixel, leftInPixel } = getGridPosition(r, c);
          const centerX = leftInPixel + widthInPixel / 2;
          const centerY = topInPixel + heightInPixel / 2;

          const dist =
            Math.abs(draggingCenterX - centerX) +
            Math.abs(draggingCenterY - centerY);

          if (dist < minDistance) {
            minDistance = dist;
            closest = { row: r, col: c };
          }
        }
      }
      return closest;
    },
    [dragState, getGridCardSize, getGridPosition, gridRef],
  );

  /*************** 이벤트 핸들러 ****************/

  const handleGridDragOverFn = useCallback(
    (clientX: number, clientY: number) => {
      if (!gridRef.current || !dragState || !simulatedLayout) {
        return;
      }

      const { row, col } = calculateGridPos(clientX, clientY);

      // Ghost 위치가 변했을 때만 계산
      if (ghost?.colNo === col && ghost?.rowNo === row) {
        return;
      }

      // 시뮬레이션을 위한 레이아웃 구성
      const ghostCard: DashboardCard = {
        cardCode: dragState.draggingCard.cardCode,
        colNo: col,
        rowNo: row,
      };

      // 드래그 중인 카드의 중심점 (픽셀단위)
      const rect = gridRef.current?.getBoundingClientRect();
      const draggingCenterX = clientX - rect.left - dragState.centerOffset.x;
      const draggingCenterY = clientY - rect.top - dragState.centerOffset.y;

      // 밀어내기 시뮬레이션 수행
      const pushedResult = getPushedLayout(
        simulatedLayout,
        ghostCard,
        new Set(),
        draggingCenterX,
        draggingCenterY,
      );

      // 밀어내기 결과 레이아웃 반영
      setSimulatedLayout(pushedResult.cards);

      // ghost 유효 여부 결정
      setGhost({ rowNo: row, colNo: col, isValid: pushedResult.isValid });
    },
    [
      calculateGridPos,
      dragState,
      getPushedLayout,
      ghost?.colNo,
      ghost?.rowNo,
      gridRef,
      setGhost,
      setSimulatedLayout,
      simulatedLayout,
    ],
  );
  const handleGridDragOverThrottled = useThrottle(handleGridDragOverFn, 100);

  const handleGridDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const clientX = e.clientX;
    const clientY = e.clientY;

    handleGridDragOverThrottled(clientX, clientY);
  };

  const handleGridDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (ghost?.isValid && simulatedLayout) {
      setRealLayout(simulatedLayout);
    }
    handleDragEnd();
  };

  const handleGridDragLeave = (e: React.DragEvent) => {
    const relatedTarget =
      e.relatedTarget || window.document.elementFromPoint(e.clientX, e.clientY);

    if (!e.currentTarget.contains(relatedTarget as Node)) {
      // 영역 외부로 나갔을 때만 처리 (자식 요소로 이동할 때는 무시)
      setGhost(null);
    }
  };

  const handleListDragEnter = () => {
    if (dragState) {
      setGhost(null);
    }
    if (dragState?.sourceArea === DASHBOARD_EDIT_AREA.GRID) {
      setIsOverList(true);
    }
  };

  const handleListDragLeave = (e: React.DragEvent) => {
    const relatedTarget =
      e.relatedTarget || window.document.elementFromPoint(e.clientX, e.clientY);

    if (!e.currentTarget.contains(relatedTarget as Node)) {
      // 영역 외부로 나갔을 때만 처리 (자식 요소로 이동할 때는 무시)
      setIsOverList(false);
    }
  };

  const handleListDrop = (e: React.DragEvent) => {
    e.preventDefault();

    // 카드 삭제
    if (dragState?.sourceArea === DASHBOARD_EDIT_AREA.GRID) {
      setRealLayout((prev) =>
        prev.filter((c) => c.cardCode !== dragState.draggingCard.cardCode),
      );
    }
    handleDragEnd();
  };

  const handleDragStart = (
    e: React.DragEvent,
    sourceArea: DashboardEditArea,
    draggingCard: DashboardCard,
  ) => {
    e.dataTransfer.effectAllowed = 'move';

    const cardRect = e.currentTarget.getBoundingClientRect();
    setDragState({
      sourceArea,
      draggingCard,
      centerOffset: {
        // 카드 중심에서 마우스 포인터까지의 상대 좌표 (픽셀 단위)
        x: e.clientX - cardRect.left - cardRect.width / 2,
        y: e.clientY - cardRect.top - cardRect.height / 2,
      },
    });

    if (sourceArea === DASHBOARD_EDIT_AREA.LIST) {
      // 리스트에서 새로 추가하는 경우
      setSimulatedLayout([...realLayout, draggingCard]);
    } else {
      setSimulatedLayout(realLayout);
    }
  };

  const handleDragEnd = () => {
    // 드래그 상태 초기화
    setDragState(null);
    setGhost(null);
    setSimulatedLayout(null);
    setIsOverList(false);
  };

  return {
    handleGridDragOver,
    handleGridDrop,
    handleGridDragLeave,
    handleListDragEnter,
    handleListDragLeave,
    handleListDrop,
    handleDragStart,
    handleDragEnd,
  };
};
