import type { ServerIngredientUnit } from '@/constants/ingredient';
import { SERVER_TO_UI_UNIT, UI_TO_SERVER_UNIT } from '@/constants/ingredient';
import type { Ingredient } from '@/types/ingredient';

// UI에서 사용하는 단위를 서버에서 사용하는 단위로 변환하는 함수
export const convertUiUnitToServerUnit = (unit: Ingredient['unit']) => {
  if (!unit) {
    return null;
  }
  return UI_TO_SERVER_UNIT[unit];
};

// 서버에서 사용되는 unit을 UI에서 사용하는 단위로 변환하는 함수
export const convertServerUnitToUiUnit = (unit: ServerIngredientUnit) => {
  return SERVER_TO_UI_UNIT[unit];
};
