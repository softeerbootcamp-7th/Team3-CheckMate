import { type FieldErrors } from 'react-hook-form';

import { toast } from 'sonner';

import { useIngredientForm } from '@/hooks/ingredient';
import type { FormValues } from '@/types/ingredient';

import { Dialog, DialogContent } from '../shared/shadcn-ui/dialog';

import { IngredientEditDialogHeader } from './IngredientEditDialogHeader';
import { IngredientEditInfoHeader } from './IngredientEditInfoHeader';
import { IngredientGrid } from './IngredientGrid';

interface IngredientEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
}

export const IngredientEditDialog = ({
  open,
  onOpenChange,
}: IngredientEditDialogProps) => {
  const mockMenuIngredients = {
    id: '1',
    menu: '딸기 스무디',
    ingredients: [
      { id: '1', name: '딸기', amount: '200', unit: 'g' },
      { id: '2', name: '우유', amount: '120', unit: 'ml' },
      { id: '3', name: '딸기시럽', amount: '10', unit: 'ml' },
    ],
  };
  const {
    control,
    register,
    handleSubmit,
    isDirty,
    formErrors,
    fields,
    append,
    remove,
    isIngredientRowEmpty,
  } = useIngredientForm({
    formValues: { ingredients: mockMenuIngredients.ingredients },
  });

  const onClickDeleteIngredient = (index: number) => {
    remove(index);
  };
  const onClickAddIngredient = () => {
    append({ id: '', name: '', amount: '', unit: '' });
  };

  const onSubmit = (data: FormValues) => {
    return data; // 그냥 임시 return. 사용하는 데는 없음
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    toast(
      '입력이 덜 된 식재료는 저장할 수 없어요. 모두 입력하거나 삭제해 주세요',
      {
        duration: 3500, // 3.5초 동안 띄워져있음
        className:
          '!bg-grey-900 !text-grey-50 !border-none !max-w-auto !w-max body-small-semibold px-400',
        position: 'bottom-center',
      },
    );
    return errors; // 그냥 임시 return. 사용하는 데는 없음
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-500 h-175 !w-[1000px] !max-w-[1000px] gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
        <form className="flex h-full min-h-0 w-full flex-col">
          {/** 메뉴명과 취소, 저장 버튼 있는 행 */}
          <IngredientEditDialogHeader
            onOpenChange={onOpenChange}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onError={onError}
            isDirty={isDirty}
            menuName={mockMenuIngredients.menu}
          />

          <div className="bg-grey-300 mt-5.5 h-[2px]" />
          <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
            {/** 식재료 목록 영역 위 식재료 입력 관련 정보 및 버튼 행(AI자동완성, 식재료추가 버튼 등) */}
            <IngredientEditInfoHeader
              fields={fields}
              onClickAddIngredient={onClickAddIngredient}
            />

            {/** 식재료 목록 나오는 그리드 영역 */}
            <IngredientGrid
              fields={fields}
              register={register}
              formErrors={formErrors}
              control={control}
              isIngredientRowEmpty={isIngredientRowEmpty}
              onClickDeleteIngredient={onClickDeleteIngredient}
            />
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};
