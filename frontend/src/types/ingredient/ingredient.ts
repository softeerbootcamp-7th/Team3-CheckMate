export interface Ingredient {
  ingredientId?: string; // 백엔드에서 받아오는 실제 식재료 ID
  name: string;
  // input은 값들을 보통 string으로 다룸
  // -> 그래야 새로운 필드 추가할 때 빈 문자열로 초기화 해 placeholder 뜨게 할 수 있음(숫자는 0으로 초기화 하거나(그러면 placeholder 안뜸) null 허용 해야함)
  amount: string;
  unit: string;
}

export interface IngredientFormValues {
  ingredients: Ingredient[];
}
