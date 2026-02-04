import { useFieldArray, useForm } from 'react-hook-form';

import type { FormValues } from '@/types/ingredient';

interface UseIngredientFormParams {
  formValues: FormValues;
}

export const useIngredientForm = ({ formValues }: UseIngredientFormParams) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, errors: formErrors },
  } = useForm<FormValues>({
    reValidateMode: 'onBlur',
    defaultValues: formValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  // 특정 식재료의 모든 input값이 비어있는지 확인하는 함수
  const isIngredientRowEmpty = (index: number) => {
    const row = getValues(`ingredients.${index}`);
    const ifAnyFieldFilled = [row.name, row.amount, row.unit].some((field) => {
      return String(field).trim().length > 0;
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
    remove,
    isIngredientRowEmpty,
  };
};
