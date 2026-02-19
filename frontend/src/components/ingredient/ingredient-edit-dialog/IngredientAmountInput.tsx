import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Input } from '@/components/shared/shadcn-ui';
import { INGREDIENT_INPUT_MAX_LENGTH } from '@/constants/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';
import { checkValidation } from '@/utils/ingredient';
import { cn } from '@/utils/shared';

interface IngredientAmountInputProps {
  index: number;
  register: UseFormRegister<IngredientFormValues>;
  formErrors: FieldErrors<IngredientFormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
  setValue: UseFormSetValue<IngredientFormValues>;
}

export const IngredientAmountInput = ({
  index,
  register,
  formErrors,
  isIngredientRowEmpty,
  setValue,
}: IngredientAmountInputProps) => {
  // 용량 입력값 변경 핸들러
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력제한(5글자)있음 -> 너무 길면 입력 아예 안되도록
    const slicedString = e.currentTarget.value.slice(
      0,
      INGREDIENT_INPUT_MAX_LENGTH.QUANTITY,
    );

    // dom에 반영
    e.currentTarget.value = slicedString;
    //  RHF에게 변경 사항 알림
    setValue(`ingredients.${index}.quantity`, slicedString, {
      shouldDirty: true, // 변경된 값이 원래 값과 다르면 form이 dirty 상태가 되도록
    });
  };
  return (
    <Input
      autoComplete="off"
      type="number"
      {...register(`ingredients.${index}.quantity`, {
        maxLength: INGREDIENT_INPUT_MAX_LENGTH.QUANTITY,
        validate: (currentFieldValue) => {
          return checkValidation({
            isIngredientRowEmpty,
            index,
            currentFieldValue,
          });
        },
      })}
      onChange={(e) => {
        handleAmountInputChange(e);
      }}
      placeholder="용량"
      className={cn(
        formErrors.ingredients?.[index]?.quantity
          ? 'border-others-negative'
          : 'border-transparent',
        'no-spinner bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 w-20 border p-250 text-center',
      )}
    />
  );
};
