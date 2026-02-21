import {
  type Control,
  useFieldArray,
  type UseFormGetValues,
} from 'react-hook-form';

import { DEFAULT_INGREDIENT } from '@/constants/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientFormFieldParams {
  control: Control<IngredientFormValues>;
  getValues: UseFormGetValues<IngredientFormValues>;
}

export const useIngredientFormField = ({
  control,
  getValues,
}: UseIngredientFormFieldParams) => {
  const fieldArrayMethods = useFieldArray({
    control,
    name: 'ingredients',
  });

  // 특정 식재료의 모든 input값이 비어있는지 확인하는 함수
  const isIngredientRowEmpty = (index: number) => {
    const row = getValues(`ingredients.${index}`);
    const ifAnyFieldFilled = [row.name, row.quantity, row.unit].some(
      (field) => {
        return String(field ?? '').trim().length > 0;
      },
    );
    return !ifAnyFieldFilled;
  };

  const handleAddIngredient = () => {
    fieldArrayMethods.append(DEFAULT_INGREDIENT);
  };

  const handleRemoveIngredient = (index: number) => {
    fieldArrayMethods.remove(index);
  };

  return {
    fieldArrayMethods,
    isIngredientRowEmpty,
    handleAddIngredient,
    handleRemoveIngredient,
  };
};
