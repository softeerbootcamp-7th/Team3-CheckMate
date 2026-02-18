import type { IngredientUnit } from '@/constants/ingredient';

export interface Ingredient {
  // 새로운 식자재 행 추가할 때는 값들이 null값임. 따라서 null도 허용해줘야 새로운 필드 추가할 때 placeholder 뜨게 할 수 있음
  name: string | null;
  quantity: number | null;
  unit: IngredientUnit | null;
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
