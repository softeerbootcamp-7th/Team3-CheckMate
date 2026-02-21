import type { Ingredient } from '@/types/ingredient';

export const DEFAULT_INGREDIENT: Ingredient = {
  name: '',
  quantity: '',
  unit: '',
} as const;
