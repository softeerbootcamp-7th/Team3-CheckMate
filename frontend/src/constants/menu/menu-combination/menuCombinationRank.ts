export const MENU_COMBINATION_RANK = {
  MAX_DISPLAYED_MENUS: 3,
  MAX_DISPLAYED_PAIRED_MENUS: 5,
  HIGHLIGHT_RANK_THRESHOLD: 3,
  EMPTY_RANK_PAIRED_MENU_ITEM: {
    menuName: '-',
    count: -1,
  } as const,
} as const;
