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
  placedCardList1: DashboardCard[],
  placedCardList2: DashboardCard[],
): boolean => {
  if (placedCardList1.length !== placedCardList2.length) {
    return false;
  }

  // 카드 배치 비교를 위해 카드 코드를 키로 하는 맵 생성
  const placedCardMap1 = new Map<string, DashboardCard>();
  const placedCardMap2 = new Map<string, DashboardCard>();

  placedCardList1.forEach((card) => placedCardMap1.set(card.cardCode, card));
  placedCardList2.forEach((card) => placedCardMap2.set(card.cardCode, card));

  for (const [cardCode, placedCard1] of placedCardMap1.entries()) {
    const matchingPlacedCard2 = placedCardMap2.get(cardCode);
    if (
      !matchingPlacedCard2 ||
      placedCard1.rowNo !== matchingPlacedCard2.rowNo ||
      placedCard1.colNo !== matchingPlacedCard2.colNo
    ) {
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
  width1: number,
  height1: number,
  row2: number,
  col2: number,
  width2: number,
  height2: number,
) => {
  const xStart1 = col1; // 첫번째 카드의 시작 x좌표
  const xEnd1 = col1 + width1 - 1; // 첫번째 카드의 끝 x좌표
  const yStart1 = row1; // 첫번째 카드의 시작 y좌표
  const yEnd1 = row1 + height1 - 1; // 첫번째 카드의 끝 y좌표

  const xStart2 = col2;
  const xEnd2 = col2 + width2 - 1;
  const yStart2 = row2;
  const yEnd2 = row2 + height2 - 1;

  const isYOverlapping = yEnd1 >= yStart2 && yEnd2 >= yStart1;
  const isXOverlapping = xEnd1 >= xStart2 && xEnd2 >= xStart1;

  return isYOverlapping && isXOverlapping;
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
