import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Input } from '@/components/shared/shadcn-ui';
import type { IngredientFormValues } from '@/types/ingredient';
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
        const onlyNumbers = e.currentTarget.value.replace(/[^0-9]/g, '');
        // dom에 반영
        e.currentTarget.value = onlyNumbers;
        //  RHF에게 변경 사항 알림
        setValue(`ingredients.${index}.amount`, onlyNumbers);
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
