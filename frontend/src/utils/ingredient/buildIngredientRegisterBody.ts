import type { Ingredient } from '@/types/ingredient';
import type { IngredientRegisterRequestDto } from '@/types/ingredient';

interface BuildIngredientRegisterBodyParams {
  menuIngredients: Ingredient[];
}
export const buildIngredientRegisterBody = ({
  menuIngredients,
}: BuildIngredientRegisterBodyParams): IngredientRegisterRequestDto => {
  // body 만드는 과정 :  quantity 는 number 타입으로 변환.
  const body: IngredientRegisterRequestDto = {
    ingredients: menuIngredients.map((item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unit: item.unit
        ? item.unit
        : (() => {
            throw new Error('단위가 없는 식재료는 등록할 수 없습니다.'); // 공백 문자 들어오면 오류 throw
          })(),
    })),
  };
  return body;
};
