import { useFieldArray, useForm } from 'react-hook-form';

import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientFormParams {
  ingredientFormValues: IngredientFormValues;
}

export const useIngredientForm = ({
  ingredientFormValues,
}: UseIngredientFormParams) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty, errors: formErrors },
  } = useForm<IngredientFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: ingredientFormValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  // 특정 식재료의 모든 input값이 비어있는지 확인하는 함수
  const isIngredientRowEmpty = (index: number) => {
    const row = getValues(`ingredients.${index}`);
    const ifAnyFieldFilled = [row.name, row.amount, row.unit].some((field) => {
      return field.trim().length > 0;
    });
    return !ifAnyFieldFilled;
  };

  return {
    control,
    register,
    handleSubmit,
    isDirty,
    formErrors,
    fields,
    append,
    setValue,
    remove,
    isIngredientRowEmpty,
  };
};
