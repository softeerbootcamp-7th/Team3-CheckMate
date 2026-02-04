import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { FormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { Input } from '../shared/shadcn-ui';

interface IngredientAmountInputProps {
  index: number;
  register: UseFormRegister<FormValues>;
  formErrors: FieldErrors<FormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
}

export const IngredientAmountInput = ({
  index,
  register,
  formErrors,
  isIngredientRowEmpty,
}: IngredientAmountInputProps) => {
  return (
    <Input
      autoComplete="off"
      maxLength={5}
      {...register(`ingredients.${index}.amount`, {
        validate: (currentFieldValue) => {
          // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
          if (isIngredientRowEmpty(index)) {
            return true;
          }
          // 용량은 반드시 입력되어야 함
          return currentFieldValue.length > 0;
        },
      })}
      onInput={(e) => {
        // 숫자만 입력되도록 실시간 필터링 -> 검증때만 입력 불가가 아니라 애초에 입력 불가능하게
        e.currentTarget.value = e.currentTarget.value.replace(
          /[^0-9]/g, // /: 정규식 시작과 끝 , ^ : 부정, g: 모든 문자에 적용
          '',
        );
      }}
      placeholder="용량"
      className={cn(
        formErrors.ingredients?.[index]?.amount
          ? 'border-others-negative'
          : 'border-transparent',
        'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 w-20 border p-250 text-center',
      )}
    />
  );
};
