export const DASHBOARD_RANKING = {
  HIGHLIGHT_RANKING: 1, // 강조할 순위
  MAX_DISPLAYED_RANK_ITEMS: 4, //화면에 보여질 최대 순위 개수
  EMPTY_RANK_ITEM: {
    itemName: '-',
    totalAmount: -1,
    unit: '원' as const,
  },
} as const;
