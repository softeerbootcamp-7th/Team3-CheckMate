import { useCallback, useMemo } from 'react';

import { toast } from 'sonner';

import type { MetricCardCode } from '@/constants/dashboard';
import {
  addCardOnGrid,
  getAvailablePositionOnGrid,
  hasCardOnGrid,
  removeCardFromGrid,
} from '@/utils/dashboard';
import {
  cloneGrid,
  countEmptyCellsOnGrid,
  getCardListFromGrid,
  isSameGrid,
} from '@/utils/dashboard/editCard';

import { useEditCardContext } from './useEditCardContext';

export const useEditCard = () => {
  const { initGrid, grid, setGrid } = useEditCardContext();

  const isDirty = useMemo(
    (): boolean => !isSameGrid(grid, initGrid),
    [grid, initGrid],
  );

  const isAdded = useCallback(
    (cardCode: MetricCardCode): boolean => hasCardOnGrid(grid, cardCode),
    [grid],
  );

  const addCard = useCallback(
    (code: MetricCardCode, sizeX: number, sizeY: number) => {
      setGrid((prev) => {
        if (hasCardOnGrid(prev, code)) {
          return prev;
        }

        const position = getAvailablePositionOnGrid(prev, sizeX, sizeY);
        if (position.row === -1 && position.col === -1) {
          toast('카드를 놓을 공간이 없어요.');
          return prev;
        }

        const newGrid = cloneGrid(prev);
        addCardOnGrid(newGrid, position, sizeX, sizeY, code);
        return newGrid;
      });
    },
    [setGrid],
  );

  const removeCard = useCallback(
    (code: MetricCardCode) => {
      setGrid((prev) => {
        if (!hasCardOnGrid(prev, code)) {
          return prev;
        }

        const newGrid = cloneGrid(prev);
        removeCardFromGrid(newGrid, code);

        return newGrid;
      });
    },
    [setGrid],
  );

  const cards = useMemo(() => getCardListFromGrid(grid), [grid]);

  const emptyCellCount = useMemo(() => countEmptyCellsOnGrid(grid), [grid]);

  return {
    grid,
    isDirty,
    addCard,
    removeCard,
    cards,
    emptyCellCount,
    isAdded,
  };
};
