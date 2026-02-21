import { useCallback } from 'react';

import { GRID_COL_SIZE, GRID_ROW_SIZE } from '@/constants/dashboard';

export const useGridCellSize = () => {
  const GRID_HEIGHT_SIZE = 410.4;
  const GRID_WIDTH_SIZE = 153 * 4;
  const GRID_GAP_SIZE = 12;

  const cellColSize =
    (GRID_WIDTH_SIZE - GRID_GAP_SIZE * (GRID_COL_SIZE - 1)) / GRID_COL_SIZE;
  const cellRowSize =
    (GRID_HEIGHT_SIZE - GRID_GAP_SIZE * (GRID_ROW_SIZE - 1)) / GRID_ROW_SIZE;

  const getGridPosition = useCallback(
    (rowNo: number, colNo: number) => {
      const leftInPixel = (colNo - 1) * (cellColSize + GRID_GAP_SIZE);
      const topInPixel = (rowNo - 1) * (cellRowSize + GRID_GAP_SIZE);

      return { topInPixel, leftInPixel };
    },
    [cellColSize, cellRowSize],
  );

  const getGridCardSize = useCallback(
    (sizeX: number, sizeY: number) => {
      const widthInPixel = sizeX * cellColSize + (sizeX - 1) * GRID_GAP_SIZE;
      const heightInPixel = sizeY * cellRowSize + (sizeY - 1) * GRID_GAP_SIZE;
      return { widthInPixel, heightInPixel };
    },
    [cellColSize, cellRowSize],
  );

  return {
    getGridPosition,
    getGridCardSize,
  };
};
