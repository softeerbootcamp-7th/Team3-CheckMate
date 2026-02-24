import { useCallback, useMemo } from 'react';

import { toast } from 'sonner';

import type { MetricCardCode } from '@/constants/dashboard';
import {
  getAvailablePositionOnGrid,
  isCardPlaced,
  isSameGrid,
} from '@/utils/dashboard';

import { useEditCardContext } from './useEditCardContext';

export const useEditCard = () => {
  const { initRealLayout, realLayout, setRealLayout } = useEditCardContext();

  const isDirty = useMemo(
    (): boolean => !isSameGrid(realLayout, initRealLayout),
    [realLayout, initRealLayout],
  );

  const isAdded = useCallback(
    (cardCode: MetricCardCode): boolean => isCardPlaced(realLayout, cardCode),
    [realLayout],
  );

  const addCard = useCallback(
    (cardCode: MetricCardCode, sizeX: number, sizeY: number) => {
      setRealLayout((prev) => {
        if (isCardPlaced(prev, cardCode)) {
          return prev;
        }

        const position = getAvailablePositionOnGrid(prev, sizeX, sizeY);
        if (position.row === -1 && position.col === -1) {
          toast('카드를 놓을 공간이 없어요.');
          return prev;
        }

        return [
          ...prev,
          { cardCode, rowNo: position.row, colNo: position.col },
        ];
      });
    },
    [setRealLayout],
  );

  const removeCard = useCallback(
    (cardCode: MetricCardCode) => {
      setRealLayout((prev) => {
        if (!isCardPlaced(prev, cardCode)) {
          return prev;
        }

        return prev.filter((c) => c.cardCode !== cardCode);
      });
    },
    [setRealLayout],
  );

  return {
    realLayout,
    isDirty,
    addCard,
    removeCard,
    isAdded,
  };
};
