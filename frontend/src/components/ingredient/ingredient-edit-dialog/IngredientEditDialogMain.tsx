import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  useAiIngredientRecommend,
  useMenuIngredientsQuery,
} from '@/hooks/ingredient';
import { useIngredientFormField } from '@/hooks/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

import { IngredientEditInfoHeader } from './IngredientEditInfoHeader';
import { IngredientGrid } from './IngredientGrid';

interface IngredientEditDialogMainProps {
  menuId: number;
}
export const IngredientEditDialogMain = ({
  menuId,
}: IngredientEditDialogMainProps) => {
  const { control, getValues, reset } = useFormContext<IngredientFormValues>();
  // 서버로 부터 해당 메뉴에 등록된 식재료 정보 받아오기
  const { data: menuIngredients } = useMenuIngredientsQuery({ menuId });

  const {
    fieldArrayMethods,
    isIngredientRowEmpty,
    handleAddIngredient,
    handleRemoveIngredient,
  } = useIngredientFormField({
    control,
    getValues,
  });
  const { isAiRecommendPending, handleAiIngredientRecommend } =
    useAiIngredientRecommend({
      fieldArrayReplace: fieldArrayMethods.replace,
    });

  useEffect(() => {
    if (!menuIngredients) {
      return;
    }
    reset({
      ingredients: menuIngredients.ingredients.map((item) => ({
        ...item,
        quantity: String(item.quantity), // 폼 창에서는 quantity가 number가 아니라 string 형태여야 함
      })),
    });
  }, [menuIngredients, reset]);
  return (
    <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
      {/** 식재료 목록 영역 위 식재료 입력 관련 정보 및 버튼 행(AI자동완성, 식재료추가 버튼 등) */}
      <IngredientEditInfoHeader
        isAiRecommendPending={isAiRecommendPending}
        fields={fieldArrayMethods.fields}
        onClickAddIngredient={handleAddIngredient}
        onClickAiIngredientRecommend={() => {
          handleAiIngredientRecommend(menuIngredients?.menuName || '');
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
  );
};
