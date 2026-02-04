import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { FormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { Input } from '../shared/shadcn-ui';
interface IngredientMenuInputProps {
  index: number;
  register: UseFormRegister<FormValues>;
  formErrors: FieldErrors<FormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
}

export const IngredientMenuInput = ({
  index,
  register,
  formErrors,
  isIngredientRowEmpty,
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
        },
        validate: (currentFieldValue) => {
          // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
          if (isIngredientRowEmpty(index)) {
            return true;
          }
          // 식자재명은 반드시 입력되어야 함
          return currentFieldValue.length > 0;
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
