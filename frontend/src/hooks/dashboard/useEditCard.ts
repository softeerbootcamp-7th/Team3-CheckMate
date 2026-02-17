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
  const { initPlacedCards, placedCards, setPlacedCards } = useEditCardContext();

  const isDirty = useMemo(
    (): boolean => !isSameGrid(placedCards, initPlacedCards),
    [placedCards, initPlacedCards],
  );

  const isAdded = useCallback(
    (cardCode: MetricCardCode): boolean => isCardPlaced(placedCards, cardCode),
    [placedCards],
  );

  const addCard = useCallback(
    (cardCode: MetricCardCode, sizeX: number, sizeY: number) => {
      setPlacedCards((prev) => {
        if (isCardPlaced(prev, cardCode)) {
          return prev;
        }

        const position = getAvailablePositionOnGrid(prev, sizeX, sizeY);
        if (position.row === -1 && position.col === -1) {
          toast('카드를 놓을 공간이 없어요.', {
            duration: 3500,
            className:
              'bg-grey-900! text-grey-50! border-none! body-small-semibold! ',
            position: 'bottom-center',
          });
          return prev;
        }

        return [
          ...prev,
          { cardCode, rowNo: position.row, colNo: position.col },
        ];
      });
    },
    [setPlacedCards],
  );

  const removeCard = useCallback(
    (cardCode: MetricCardCode) => {
      setPlacedCards((prev) => {
        if (!isCardPlaced(prev, cardCode)) {
          return prev;
        }

        return prev.filter((c) => c.cardCode !== cardCode);
      });
    },
    [setPlacedCards],
  );

  return {
    placedCards,
    isDirty,
    addCard,
    removeCard,
    isAdded,
  };
};
