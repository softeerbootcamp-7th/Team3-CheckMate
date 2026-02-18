import type { IngredientUnit, ServerIngredientUnit } from './ingredientUnit';

// 서버에서 보내주는 식자재 단위를 UI에서 사용하는 단위로 변환하는 매핑 객체
export const SERVER_TO_UI_UNIT: Record<ServerIngredientUnit, IngredientUnit> = {
  G: 'g',
  KG: 'kg',
  ML: 'ml',
  L: 'L',
};

// 프론트에서 사용하는 단위를 백에서 사용하는 단위로 변환하는 매핑 객체
export const UI_TO_SERVER_UNIT: Record<IngredientUnit, ServerIngredientUnit> = {
  g: 'G',
  kg: 'KG',
  ml: 'ML',
  L: 'L',
};
