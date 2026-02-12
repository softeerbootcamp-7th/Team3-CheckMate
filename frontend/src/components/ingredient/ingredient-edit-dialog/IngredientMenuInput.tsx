import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Input } from '@/components/shared/shadcn-ui';
import type { IngredientFormValues } from '@/types/ingredient';
import { checkValidation } from '@/utils/ingredient';
import { cn } from '@/utils/shared';
interface IngredientMenuInputProps {
  index: number;
  register: UseFormRegister<IngredientFormValues>;
  formErrors: FieldErrors<IngredientFormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
  setValue: UseFormSetValue<IngredientFormValues>;
}

export const IngredientMenuInput = ({
  index,
  register,
  formErrors,
  isIngredientRowEmpty,
  setValue,
}: IngredientMenuInputProps) => {
  return (
    <Input
      autoComplete="off"
      maxLength={10} // 태그 자체 글자수 제한 기능
      {...register(`ingredients.${index}.name`, {
        maxLength: 10,
        onBlur: (e) => {
          // 사용자가 입력 마치고 다른 영역 클릭했을 때 실행되는 함수 -> 앞뒤 공백 제거
          e.target.value = e.target.value.trim();
          setValue(`ingredients.${index}.name`, e.target.value);
        },
        validate: (currentFieldValue) => {
          return checkValidation({
            isIngredientRowEmpty,
            index,
            currentFieldValue,
          });
        },
      })}
      placeholder="식재료명"
      className={cn(
        formErrors.ingredients?.[index]?.name
          ? 'border-others-negative'
          : 'border-transparent',
        'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 flex-1 border p-250',
      )}
    />
  );
};
