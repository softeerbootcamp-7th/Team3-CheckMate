import {
  DASHBOARD_METRIC_CARDS,
  GRID_COL_SIZE,
  GRID_ROW_SIZE,
  type MetricCardCode,
} from '@/constants/dashboard';
import type { DashboardCard } from '@/types/dashboard';

interface GridPosition {
  row: number;
  col: number;
}

const INVALID_POSITION: GridPosition = { row: -1, col: -1 };

const getGridFromPlacedCards = (placedCards: DashboardCard[]) => {
  const grid: (MetricCardCode | null)[][] = Array.from(
    { length: GRID_ROW_SIZE + 1 },
    () => Array(GRID_COL_SIZE + 1).fill(null),
  );

  placedCards.forEach(({ cardCode, rowNo, colNo }) => {
    const cardDef = DASHBOARD_METRIC_CARDS[cardCode];
    if (cardDef) {
      for (let r = rowNo; r < rowNo + cardDef.sizeY; r++) {
        for (let c = colNo; c < colNo + cardDef.sizeX; c++) {
          grid[r][c] = cardCode;
        }
      }
    }
  });

  return grid;
};

export const isSameGrid = (
  placedCards1: DashboardCard[],
  placedCards2: DashboardCard[],
): boolean => {
  if (placedCards1.length !== placedCards2.length) {
    return false;
  }

  const cardMap1 = new Map<string, DashboardCard>();
  const cardMap2 = new Map<string, DashboardCard>();

  placedCards1.forEach((card) => cardMap1.set(card.cardCode, card));
  placedCards2.forEach((card) => cardMap2.set(card.cardCode, card));

  for (const [cardCode, card1] of cardMap1.entries()) {
    const card2 = cardMap2.get(cardCode);
    if (!card2 || card1.rowNo !== card2.rowNo || card1.colNo !== card2.colNo) {
      return false;
    }
  }
  return true;
};

export const isCardPlaced = (
  placedCards: DashboardCard[],
  cardCode: MetricCardCode,
) => {
  for (const card of placedCards) {
    if (card.cardCode === cardCode) {
      return true;
    }
  }
  return false;
};

const isAreaAvailableOnGrid = (
  grid: (MetricCardCode | null)[][],
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
  placedCards: DashboardCard[],
  sizeX: number,
  sizeY: number,
): GridPosition => {
  const grid = getGridFromPlacedCards(placedCards);

  for (let r = 1; r <= GRID_ROW_SIZE; r++) {
    for (let c = 1; c <= GRID_COL_SIZE; c++) {
      if (isAreaAvailableOnGrid(grid, r, c, sizeX, sizeY)) {
        return { row: r, col: c };
      }
    }
  }
  return INVALID_POSITION;
};

const isOverlapping = (
  row1: number,
  col1: number,
  sizeX1: number,
  sizeY1: number,
  row2: number,
  col2: number,
  sizeX2: number,
  sizeY2: number,
) => {
  return (
    row1 + sizeY1 > row2 &&
    row2 + sizeY2 > row1 &&
    col1 + sizeX1 > col2 &&
    col2 + sizeX2 > col1
  );
};

export const getConflictingCards = (
  ghostCard: DashboardCard,
  placedCards: DashboardCard[],
) => {
  return placedCards.filter((c) => {
    if (c.cardCode === ghostCard.cardCode) {
      return false; // 자기 자신과는 충돌하지 않음
    }

    const cDef = DASHBOARD_METRIC_CARDS[c.cardCode];
    const ghostCardDef = DASHBOARD_METRIC_CARDS[ghostCard.cardCode];

    return isOverlapping(
      // row, col, sizeX, sizeY
      ghostCard.rowNo,
      ghostCard.colNo,
      ghostCardDef.sizeX,
      ghostCardDef.sizeY,
      c.rowNo,
      c.colNo,
      cDef.sizeX,
      cDef.sizeY,
    );
  });
};
