export const MENU_SALES_RANK = {
  MAX_DISPLAYED_RANK_ITEMS: 5,
  HIGHLIGHT_RANK_THRESHOLD: 3,
  TOTAL_SALES_AMOUNT_UNIT: '원',
  TOTAL_ORDER_COUNT_UNIT: '건',
  // 랭킹 아이템이 없을 때 사용하는 빈 아이템
  EMPTY_RANK_ITEM: {
    menuName: '-',
    totalSalesAmount: -1,
    orderCount: -1,
  } as const,
} as const;
