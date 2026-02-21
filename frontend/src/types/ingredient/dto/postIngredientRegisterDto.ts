import type { MenuIngredientsDto } from './getMenuIngredientsDto';

// export interface MenuIngredientsDto {
//   name: string;
//   quantity: number;
//   unit: ServerIngredientUnit;
// }

// 메뉴 등록(post, put) 모두에서 사용되는 request DTO
export interface IngredientRegisterRequestDto {
  ingredients: MenuIngredientsDto[];
}

export type PostIngredientRegisterRequestDto = IngredientRegisterRequestDto;
