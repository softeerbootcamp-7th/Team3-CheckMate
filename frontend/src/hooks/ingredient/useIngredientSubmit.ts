import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ingredientKeys,
  postIngredientRegister,
  type PostIngredientRegisterParams,
  putIngredientRegister,
} from '@/services/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientEditSubmitParams {
  menuId: number;
  onOpenChange: (open: boolean) => void;
  hasIngredients: boolean; // 메뉴에 등록된 식자재 유무. -> false면 폼 제출 시 post, true면 put 요청 보내야 함
  menuName: string; // 제출한 데이터 바로 캐싱할 때 필요
}

export const useIngredientEditSubmit = ({
  menuId,
  onOpenChange,
  hasIngredients,
  menuName,
}: UseIngredientEditSubmitParams) => {
  const queryClient = useQueryClient();

  // 식자재 등록/수정 성공 시 실행할 함수
  const handleSubmitSuccess = async (
    variable: PostIngredientRegisterParams,
    menuName: string,
  ) => {
    await Promise.all([
      queryClient.setQueryData(
        ingredientKeys.menuIngredients(variable.menuId),
        { menuName, ingredients: variable.menuIngredients },
      ),
      // 식자재 등록 후 매장에 등록된 메뉴 목록 다시 불러와야 함
      // 메뉴 목록에서 화면에 보여지는 hasIngredient('등록된 식자재 존재 유무') 정보가 바뀌기 때문
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.registeredMenus(),
      }),
    ]);

    onOpenChange(false); // 모달 창 닫기
  };

  // 식자재 등록/수정 실패 시 실행할 함수
  const handleSubmitError = () => {
    // 서버와 통신 실패했다면 토스트 띄우기
    toast('식재료 등록에 실패했어요. 다시 시도해 주세요');
  };

  const { mutate, isPending: isSubmitting } = useMutation({
    // 메뉴에 등록된 식자재가 없다면 post, 있다면 put 요청 보내기
    mutationFn: hasIngredients ? putIngredientRegister : postIngredientRegister,
    onSuccess: (_data, variable) => handleSubmitSuccess(variable, menuName),
    onError: handleSubmitError,
  });

  // 폼 제출 시 실행되는 함수
  const onSubmit = async (data: IngredientFormValues) => {
    // 모든 필드가 채워진 데이터만 서버에 보내야함
    const filteredIngredients = data.ingredients.filter((ingredient) =>
      Object.values(ingredient).every(
        (value) => String(value).trim().length > 0,
      ),
    );
    mutate({ menuId, menuIngredients: filteredIngredients });
  };

  return { onSubmit, isSubmitting };
};
