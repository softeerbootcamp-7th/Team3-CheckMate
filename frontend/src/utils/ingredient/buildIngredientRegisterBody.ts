import type { Ingredient } from '@/types/ingredient';
import type { IngredientRegisterRequestDto } from '@/types/ingredient/dto/ingredientRegisterDto';

import { convertUiUnitToServerUnit } from './convertUnit';

interface BuildIngredientRegisterBodyParams {
  menuIngredients: Ingredient[];
}
export const buildIngredientRegisterBody = ({
  menuIngredients,
}: BuildIngredientRegisterBodyParams): IngredientRegisterRequestDto => {
  // body 만드는 과정 :  UI에서 사용 하는 단위를 서버에서 사용하는 단위(전부 대문자)로 변환
  const body: IngredientRegisterRequestDto = {
    ingredients: menuIngredients.map((item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unit:
        convertUiUnitToServerUnit(item.unit) ??
        (() => {
          throw new Error('알 수 없는 단위입니다.');
        })(),
    })),
  };
  return body;
};
