import { type FieldErrors, FormProvider } from 'react-hook-form';

import { toast } from 'sonner';

import { Dialog, DialogContent } from '@/components/shared/shadcn-ui';
import {
  useAiIngredientRecommend,
  useIngredientEditSubmit,
  useIngredientForm,
} from '@/hooks/ingredient';
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

  const { isAiRecommendPending, handleAiIngredientRecommend } =
    useAiIngredientRecommend({
      fieldArrayReplace: fieldArrayMethods.replace,
    });

  const { onSubmit } = useIngredientEditSubmit({
    onOpenChange,
  });

  const onClickCancel = () => {
    onOpenChange(false);
  };
  const onError = (errors: FieldErrors<IngredientFormValues>) => {
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
      <FormProvider {...formMethods}>
        {/** w-250, max-w-250 이렇게 tailwind 스타일로 하면 width 속성 적용 안됨. w-250은 tailwind에 없음 */}
        <DialogContent className="rounded-500 h-175 w-[1000px]! max-w-[1000px]! gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
          <form
            className="flex h-full flex-col"
            onSubmit={formMethods.handleSubmit(onSubmit, onError)}
          >
            {/** 메뉴명과 취소, 저장 버튼 있는 행 */}
            <IngredientEditDialogHeader
              onClickCancel={onClickCancel}
              menuName={mockMenuIngredients.menu}
            />

            <div className="bg-grey-300 mt-5.5 h-0.5" />
            <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
              {/** 식재료 목록 영역 위 식재료 입력 관련 정보 및 버튼 행(AI자동완성, 식재료추가 버튼 등) */}
              <IngredientEditInfoHeader
                isAiRecommendPending={isAiRecommendPending}
                fields={fieldArrayMethods.fields}
                onClickAddIngredient={handleAddIngredient}
                onClickAiIngredientRecommend={() => {
                  handleAiIngredientRecommend(mockMenuIngredients.menu);
                }}
              />

              {/** 식재료 목록 나오는 그리드 영역 */}
              <IngredientGrid
                isPending={isAiRecommendPending}
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
