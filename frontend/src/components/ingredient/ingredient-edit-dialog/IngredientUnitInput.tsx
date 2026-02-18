import { Fragment } from 'react/jsx-runtime';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/shadcn-ui';
import { INGREDIENT_UNIT } from '@/constants/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';
import { checkValidation } from '@/utils/ingredient';
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
          return checkValidation({
            isIngredientRowEmpty,
            index,
            currentFieldValue,
          });
        },
      }}
      render={({ field }) => {
        return (
          <Select
            value={field.value?.toString() || ''}
            onValueChange={field.onChange}
          >
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
                    <Fragment key={unit}>
                      <IngredientUnitSelectItem unit={unit} />
                      {/* Fragment 구조에서는 SelectSeparator가 정상 동작하지 않아 div로 구분선 처리 */}
                      {index !== Object.values(INGREDIENT_UNIT).length - 1 && (
                        <div className="bg-grey-300 h-px w-full" />
                      )}
                    </Fragment>
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
