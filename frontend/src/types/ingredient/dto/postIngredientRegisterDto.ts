import type { MenuIngredientsDto } from './getMenuIngredientsDto';

// export interface MenuIngredientsDto {
//   name: string;
//   quantity: number;
//   unit: ServerIngredientUnit;
// }

export interface PostIngredientRegisterRequestDto {
  ingredients: MenuIngredientsDto[];
}
