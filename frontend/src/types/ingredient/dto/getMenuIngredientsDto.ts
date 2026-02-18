import type { ServerIngredientUnit } from '@/constants/ingredient';

interface MenuIngredientsDto {
  name: string;
  quantity: number;
  unit: ServerIngredientUnit;
}

export interface GetMenuIngredientsResponseDto {
  menuName: string;
  ingredients: MenuIngredientsDto[];
}
