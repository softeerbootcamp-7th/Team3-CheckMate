import type { Ingredient } from '@/types/ingredient';

export interface PostAiIngredientRecommendRequestDto {
  menu: string; // 식자재 추천받고 싶으면 메뉴 명 ex) 딸기 스무디
}
export interface PostAiIngredientRecommendResponseDto {
  ingredients: Ingredient[];
}
