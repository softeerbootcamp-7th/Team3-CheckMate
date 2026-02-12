import { useMemo } from 'react';

import { toast } from 'sonner';

import { GRID_COL_SIZE, GRID_ROW_SIZE } from '@/constants/dashboard';

import { useEditCardContext } from './useEditCardContext';

export const useEditCard = () => {
  const { initGrid, grid, setGrid } = useEditCardContext();

  const isAvailablePosition = (
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
  ): boolean => {
    for (let r = y; r < y + sizeY; r++) {
      for (let c = x; c < x + sizeX; c++) {
        if (r > GRID_ROW_SIZE || c > GRID_COL_SIZE || grid[r][c] !== '') {
          return false;
        }
      }
    }
    return true;
  };

  const isDirty = useMemo((): boolean => {
    for (let r = 1; r <= GRID_ROW_SIZE; r++) {
      for (let c = 1; c <= GRID_COL_SIZE; c++) {
        if (grid[r][c] !== initGrid[r][c]) {
          return true;
        }
      }
    }
    return false;
  }, [grid, initGrid]);

  const getFirstAvailablePosition = (
    sizeX: number,
    sizeY: number,
  ): { x: number; y: number } => {
    for (let r = 1; r <= GRID_ROW_SIZE; r++) {
      for (let c = 1; c <= GRID_COL_SIZE; c++) {
        if (isAvailablePosition(c, r, sizeX, sizeY)) {
          return { x: c, y: r };
        }
      }
    }
    return { x: -1, y: -1 };
  };

  const addCard = (code: string, sizeX: number, sizeY: number) => {
    const position = getFirstAvailablePosition(sizeX, sizeY);
    if (position.x === -1 && position.y === -1) {
      toast('카드를 놓을 공간이 없어요.', {
        duration: 3500,
        className:
          'bg-grey-900! text-grey-50! border-none! body-small-semibold! ',
        position: 'bottom-center',
      });
      return;
    }
    for (let r = position.y; r < position.y + sizeY; r++) {
      for (let c = position.x; c < position.x + sizeX; c++) {
        setGrid((prev) => {
          const newGrid = prev.map((row) => [...row]);
          newGrid[r][c] = code;
          return newGrid;
        });
      }
    }
  };

  const removeCard = (code: string) => {
    for (let r = 1; r <= GRID_ROW_SIZE; r++) {
      for (let c = 1; c <= GRID_COL_SIZE; c++) {
        if (grid[r][c] === code) {
          setGrid((prev) => {
            const newGrid = prev.map((row) => [...row]);
            newGrid[r][c] = '';
            return newGrid;
          });
        }
      }
    }
  };

  // const printGrid = (gridToPrint: string[][]) => {
  //   let rowStr = '';
  //   for (let r = 1; r <= GRID_ROW_SIZE; r++) {
  //     for (let c = 1; c <= GRID_COL_SIZE; c++) {
  //       rowStr += gridToPrint[r][c] === '' ? '[ ]' : `[${gridToPrint[r][c]}]`;
  //     }
  //     rowStr += '\n';
  //   }
  //   console.log(rowStr);
  // };

  const cards = useMemo(() => {
    const cardList: { code: string; rowNo: number; colNo: number }[] = [];
    const cardSet = new Set<string>();
    for (let r = 1; r <= GRID_ROW_SIZE; r++) {
      for (let c = 1; c <= GRID_COL_SIZE; c++) {
        const code = grid[r][c];
        if (code !== '' && !cardSet.has(code)) {
          cardList.push({ code, rowNo: r, colNo: c });
          cardSet.add(code);
        }
      }
    }
    return cardList;
  }, [grid]);

  const emptyCellCount = useMemo(() => {
    let count = 0;
    for (let r = 1; r <= GRID_ROW_SIZE; r++) {
      for (let c = 1; c <= GRID_COL_SIZE; c++) {
        if (grid[r][c] === '') {
          count++;
        }
      }
    }
    return count;
  }, [grid]);

  return {
    grid,
    isDirty,
    addCard,
    removeCard,
    cards,
    emptyCellCount,
  };
};
