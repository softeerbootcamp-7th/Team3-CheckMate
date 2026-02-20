import type { ValueOf } from '@/utils/shared';

export const INGREDIENT_UNIT = {
  ml: 'ml',
  L: 'L',
  g: 'g',
  kg: 'kg',
} as const;

export type IngredientUnit = ValueOf<typeof INGREDIENT_UNIT>;

// 서버에서 사용하고 있는 식재료 단위
export const SERVER_INGREDIENT_UNIT = {
  G: 'G',
  KG: 'KG',
  ML: 'ML',
  L: 'L',
} as const;

export type ServerIngredientUnit = ValueOf<typeof SERVER_INGREDIENT_UNIT>;
