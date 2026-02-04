import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import { X } from 'lucide-react';

import type { FormValues } from '@/types/ingredient';

import { Button } from '../shared/shadcn-ui';

import { IngredientAmountInput } from './IngredientAmountInput';
import { IngredientMenuInput } from './IngredientMenuInput';
import { IngredientUnitInput } from './IngredientUnitInput';

interface IngredientGridProps {
  fields: FormValues['ingredients'];
  register: UseFormRegister<FormValues>;
  formErrors: FieldErrors<FormValues>;
  control: Control<FormValues>;
  isIngredientRowEmpty: (index: number) => boolean;
  onClickDeleteIngredient: (index: number) => void;
}

export const IngredientGrid = ({
  fields,
  register,
  formErrors,
  control,
  isIngredientRowEmpty,
  onClickDeleteIngredient,
}: IngredientGridProps) => {
  return (
    <main className="flex-1 overflow-y-auto p-1">
      {fields.length === 0 ? ( // 식재료가 하나도 없을 때
        <div className="text-grey-500 flex h-full items-center justify-center pb-10">
          메뉴 제조에 필요한 식재료를 등록해주세요
        </div>
      ) : (
        <div className="!body-medium-semibold grid auto-rows-[42px] grid-cols-2 gap-x-12 gap-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex h-full items-center gap-2.5">
              <IngredientMenuInput
                index={index}
                register={register}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
              />
              <IngredientAmountInput
                index={index}
                register={register}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
              />
              <IngredientUnitInput
                index={index}
                control={control}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
              />

              <Button
                className="!P-0 text-grey-600 size-6"
                type="button"
                onClick={() => {
                  onClickDeleteIngredient(index);
                }}
              >
                <X className="size-6" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
