import { useFormContext } from 'react-hook-form';

import { X } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import type { IngredientField, IngredientFormValues } from '@/types/ingredient';

import { IngredientAmountInput } from './IngredientAmountInput';
import { IngredientMenuInput } from './IngredientMenuInput';
import { IngredientSkeleton } from './IngredientSkeleton';
import { IngredientUnitInput } from './IngredientUnitInput';

interface IngredientGridProps {
  isPending: boolean;
  fields: IngredientField[];
  isIngredientRowEmpty: (index: number) => boolean;
  onClickDeleteIngredient: (index: number) => void;
}

export const IngredientGrid = ({
  isPending,
  fields,
  isIngredientRowEmpty,
  onClickDeleteIngredient,
}: IngredientGridProps) => {
  const {
    register,
    formState: { errors: formErrors },
    control,
    setValue,
  } = useFormContext<IngredientFormValues>();
  // 데이터 로딩 중(서버로부터 받아오든, AI 자동생성 중이든) 일 때 보여줄 화면
  if (isPending) {
    return (
      <main className="flex-1 p-1">
        <div className="body-medium-semibold! grid auto-rows-[42px] grid-cols-2 gap-x-12 gap-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <IngredientSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }
  return (
    <main className="flex-1 overflow-y-auto p-1">
      {fields.length === 0 ? ( // 식재료가 하나도 없을 때
        <div className="text-grey-500 flex h-full items-center justify-center pb-10">
          메뉴 제조에 필요한 식재료를 등록해주세요
        </div>
      ) : (
        <div className="body-medium-semibold! auto-rows-10.5 grid grid-cols-2 gap-x-12 gap-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex h-full items-center gap-2.5">
              <IngredientMenuInput
                index={index}
                register={register}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
                setValue={setValue}
              />
              <IngredientAmountInput
                index={index}
                register={register}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
                setValue={setValue}
              />
              <IngredientUnitInput
                index={index}
                control={control}
                formErrors={formErrors}
                isIngredientRowEmpty={isIngredientRowEmpty}
              />

              <Button
                className="text-grey-600 size-6 p-0!"
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
