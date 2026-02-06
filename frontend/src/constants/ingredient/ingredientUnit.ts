import type { ValueOf } from '@/utils/shared';

export const INGREDIENT_UNIT = {
  ml: 'ml',
  L: 'L',
  g: 'g',
  kg: 'kg',
} as const;

export type IngredientUnit = ValueOf<typeof INGREDIENT_UNIT>;
