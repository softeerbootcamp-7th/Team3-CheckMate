import { useFieldArray, useForm } from 'react-hook-form';

import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientFormParams {
  ingredientFormValues: IngredientFormValues;
}

export const useIngredientForm = ({
  ingredientFormValues,
}: UseIngredientFormParams) => {
  const formMethods = useForm<IngredientFormValues>({
    defaultValues: ingredientFormValues,
    reValidateMode: 'onBlur',
  });
  const fieldArrayMethods = useFieldArray({
    control: formMethods.control,
    name: 'ingredients',
  });

  // 특정 식재료의 모든 input값이 비어있는지 확인하는 함수
  const isIngredientRowEmpty = (index: number) => {
    const row = formMethods.getValues(`ingredients.${index}`);
    const ifAnyFieldFilled = [row.name, row.amount, row.unit].some((field) => {
      return field.trim().length > 0;
    });
    return !ifAnyFieldFilled;
  };

  return {
    formMethods,
    fieldArrayMethods,
    isIngredientRowEmpty,
  };
};
