export interface Ingredient {
  ingredientId: string;
  name: string;
  // input은 값들을 보통 string으로 다룸
  // -> 그래야 새로운 필드 추가할 때 빈 문자열로 초기화 해 placeholder 뜨게 할 수 있음(숫자는 0으로 초기화 하거나(그러면 placeholder 안뜸) null 허용 해야함)
  amount: string;
  unit: string;
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
