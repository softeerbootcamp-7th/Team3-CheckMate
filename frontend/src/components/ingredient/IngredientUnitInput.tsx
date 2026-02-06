import { type Control, Controller, type FieldErrors } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/shadcn-ui';
import { INGREDIENT_UNIT } from '@/constants/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { IngredientUnitSelectItem } from './IngredientUnitSelectItem';

interface IngredientUnitInputProps {
  index: number;
  control: Control<IngredientFormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
  formErrors: FieldErrors<IngredientFormValues>;
}

export const IngredientUnitInput = ({
  index,
  control,
  formErrors,
  isIngredientRowEmpty,
}: IngredientUnitInputProps) => {
  return (
    <Controller
      name={`ingredients.${index}.unit`}
      control={control}
      rules={{
        validate: (currentFieldValue) => {
          // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
          if (isIngredientRowEmpty(index)) {
            return true;
          }
          // 단위는 반드시 선택되어야 함
          return currentFieldValue.length > 0;
        },
      }}
      render={({ field }) => {
        return (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={cn(
                formErrors.ingredients?.[index]?.unit
                  ? 'border-others-negative'
                  : 'border-transparent',
                'bg-grey-200 rounded-150 h-10.5! w-19! shrink-0 gap-0 border px-250 py-200',
              )}
            >
              <div
                className={cn(
                  field.value ? 'text-grey-900' : 'text-grey-400',
                  'flex h-full w-full items-center justify-center',
                )}
              >
                <SelectValue
                  placeholder={field.value ? `${field.value}` : '단위'}
                />
              </div>
            </SelectTrigger>
            <SelectContent
              className="border-grey-300 min-w-0 border bg-gray-100"
              position={'popper'}
            >
              <SelectGroup>
                {Object.values(INGREDIENT_UNIT).map((unit, index) => {
                  return (
                    <>
                      <IngredientUnitSelectItem unit={unit} />
                      {index !== Object.values(INGREDIENT_UNIT).length - 1 && (
                        <SelectSeparator />
                      )}
                    </>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};
