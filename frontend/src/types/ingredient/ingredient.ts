import type { IngredientUnit } from '@/constants/ingredient';

export interface Ingredient {
  name: string;
  quantity: string;
  unit: IngredientUnit | ''; // 새로운 식자재 행 추가할 때 unit은 빈 문자열이어야 함 (아직 단위 선택 안 했을 때)
}

export interface IngredientFormValues {
  ingredients: Ingredient[];
}

// RHF가 useFieldArray에서 배열 요소에 자동으로 key(id)를 추가한다.
// => 기존 타입 + id 속성.
// 따라서 useFieldArray에서 사용하는 필드의 타입은 Ingredient 자체가 아닌 Ingredient에서 id 속성까지 추가된 IngredientField
export interface IngredientField extends Ingredient {
  id: string;
}

// 각 메뉴 별 등록된 식자재 정보
export interface MenuIngredients {
  menuName: string;
  ingredients: Ingredient[];
}
