import {
  GRID_COL_SIZE,
  GRID_ROW_SIZE,
  type MetricCardCode,
} from '@/constants/dashboard';
import type { DashboardCard } from '@/types/dashboard';

type Grid = (MetricCardCode | null)[][];

interface GridPosition {
  row: number;
  col: number;
}

const INVALID_POSITION: GridPosition = { row: -1, col: -1 };

export const cloneGrid = (grid: Grid): Grid => grid.map((row) => [...row]);

export const isSameGrid = (grid1: Grid, grid2: Grid): boolean => {
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (grid1[r][c] !== grid2[r][c]) {
        return false;
      }
    }
  }
  return true;
};

export const hasCardOnGrid = (grid: Grid, cardCode: MetricCardCode) => {
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (grid[r][c] === cardCode) {
        return true;
      }
    }
  }
  return false;
};

export const isAreaAvailableOnGrid = (
  grid: Grid,
  row: number,
  col: number,
  sizeX: number,
  sizeY: number,
) => {
  for (let r = row; r < row + sizeY; r++) {
    for (let c = col; c < col + sizeX; c++) {
      if (r > GRID_ROW_SIZE || c > GRID_COL_SIZE || grid[r][c] !== null) {
        return false;
      }
    }
  }
  return true;
};

export const getAvailablePositionOnGrid = (
  grid: Grid,
  sizeX: number,
  sizeY: number,
): GridPosition => {
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (isAreaAvailableOnGrid(grid, r, c, sizeX, sizeY)) {
        return { row: r, col: c };
      }
    }
  }
  return INVALID_POSITION;
};

export const addCardOnGrid = (
  grid: Grid,
  position: GridPosition,
  sizeX: number,
  sizeY: number,
  cardCode: MetricCardCode,
) => {
  for (let r = position.row; r < position.row + sizeY; r++) {
    for (let c = position.col; c < position.col + sizeX; c++) {
      grid[r][c] = cardCode;
    }
  }
};

export const removeCardFromGrid = (grid: Grid, cardCode: MetricCardCode) => {
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (grid[r][c] === cardCode) {
        grid[r][c] = null;
      }
    }
  }
};

export const getCardListFromGrid = (grid: Grid): DashboardCard[] => {
  const cardList: DashboardCard[] = [];
  const cardSet = new Set<string>();
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      const code = grid[r][c];
      if (code !== null && !cardSet.has(code)) {
        cardList.push({ cardCode: code, rowNo: r, colNo: c });
        cardSet.add(code);
      }
    }
  }
  return cardList;
};

export const countEmptyCellsOnGrid = (grid: Grid) => {
  let count = 0;
  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (grid[r][c] === null) {
        count++;
      }
    }
  }
  return count;
};
