import { type FieldErrors, FormProvider } from 'react-hook-form';

import { toast } from 'sonner';

import { Dialog, DialogContent } from '@/components/shared/shadcn-ui';
import { useIngredientEditSubmit, useIngredientForm } from '@/hooks/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

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
      { ingredientId: '1', name: '딸기', amount: '200', unit: 'g' },
      { ingredientId: '2', name: '우유', amount: '120', unit: 'ml' },
      { ingredientId: '3', name: '딸기시럽', amount: '10', unit: 'ml' },
    ],
  };
  const {
    formMethods,
    fieldArrayMethods,
    isIngredientRowEmpty,
    handleAddIngredient,
    handleRemoveIngredient,
  } = useIngredientForm({
    ingredientFormValues: { ingredients: mockMenuIngredients.ingredients },
  });
  const onClickCancel = () => {
    onOpenChange(false);
  };
  const { onSubmit } = useIngredientEditSubmit({
    onOpenChange,
  });

  const onError = (errors: FieldErrors<IngredientFormValues>) => {
    toast(
      '입력이 덜 된 식재료는 저장할 수 없어요. 모두 입력하거나 삭제해 주세요',
      {
        duration: 3500,
        className:
          '!bg-grey-900 !text-grey-50 !border-none !max-w-auto !w-max body-small-semibold px-400',
        position: 'bottom-center',
      },
    );
    return errors;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FormProvider {...formMethods}>
        <DialogContent className="rounded-500 flex h-175 w-[1000px]! max-w-[1000px]! flex-col gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
          <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
            {/** 메뉴명과 취소, 저장 버튼 있는 행 */}
            <IngredientEditDialogHeader
              onClickCancel={onClickCancel}
              menuName={mockMenuIngredients.menu}
            />

            <div className="bg-grey-300 mt-5.5 h-0.5" />
            <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
              {/** 식재료 목록 영역 위 식재료 입력 관련 정보 및 버튼 행(AI자동완성, 식재료추가 버튼 등) */}
              <IngredientEditInfoHeader
                fields={fieldArrayMethods.fields}
                onClickAddIngredient={handleAddIngredient}
              />

              {/** 식재료 목록 나오는 그리드 영역 */}
              <IngredientGrid
                fields={fieldArrayMethods.fields}
                isIngredientRowEmpty={isIngredientRowEmpty}
                onClickDeleteIngredient={handleRemoveIngredient}
              />
            </section>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
};
