import { GRID_COL_SIZE, GRID_ROW_SIZE } from '@/constants/dashboard';

export const useGridCellSize = () => {
  const GRID_HEIGHT_SIZE = 724;
  const GRID_WIDTH_SIZE = 550;
  const GRID_GAP_SIZE = 20;

  const cellColSize =
    (GRID_WIDTH_SIZE - GRID_GAP_SIZE * (GRID_COL_SIZE - 1)) / GRID_COL_SIZE;
  const cellRowSize =
    (GRID_HEIGHT_SIZE - GRID_GAP_SIZE * (GRID_ROW_SIZE - 1)) / GRID_ROW_SIZE;

  const getGridPosition = (rowNo: number, colNo: number) => {
    // `rowNo`/`colNo` are 1-based indices. 첫 번째 셀의 좌표는 0 이므로
    // 위치 계산은 (index - 1) * (cellSize + gap) 로 해야 합니다.
    const colPx = (colNo - 1) * (cellColSize + GRID_GAP_SIZE);
    const rowPx = (rowNo - 1) * (cellRowSize + GRID_GAP_SIZE);

    return { rowPx, colPx };
  };

  const getGridCardSize = (sizeX: number, sizeY: number) => {
    const widthPx = sizeX * cellColSize + (sizeX - 1) * GRID_GAP_SIZE;
    const heightPx = sizeY * cellRowSize + (sizeY - 1) * GRID_GAP_SIZE;
    return { widthPx, heightPx };
  };

  return {
    getGridPosition,
    getGridCardSize,
  };
};
