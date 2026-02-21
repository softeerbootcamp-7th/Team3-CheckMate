export const INGREDIENT_CONSUMPTION_RANK = {
  MAX_DISPLAYED_RANK_ITEMS_1_TO_5: 5,
  MAX_DISPLAYED_RANK_ITEMS_6_TO_10: 10,
  HIGHLIGHT_RANK_THRESHOLD: 3,
  // 랭킹 아이템이 없을 때 사용하는 빈 아이템
  EMPTY_RANK_ITEM: {
    ingredientName: '-',
    totalQuantity: -1,
    baseUnit: '',
  } as const,
} as const;
