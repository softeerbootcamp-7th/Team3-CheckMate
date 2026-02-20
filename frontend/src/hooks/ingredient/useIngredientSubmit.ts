import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ingredientKeys,
  postIngredientRegister,
  putIngredientRegister,
} from '@/services/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientEditSubmitParams {
  menuId: number;
  onOpenChange: (open: boolean) => void;
  hasIngredients: boolean; // 메뉴에 등록된 식자재 유무. -> false면 폼 제출 시 post, true면 put 요청 보내야 함
}

export const useIngredientEditSubmit = ({
  menuId,
  onOpenChange,
  hasIngredients,
}: UseIngredientEditSubmitParams) => {
  const queryClient = useQueryClient();

  // 식자재 등록/수정 성공 시 실행할 함수
  const handleSubmitSuccess = async () => {
    await Promise.all([
      // 식자재 등록 후 해당 메뉴의 식자재 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.menuIngredients(menuId),
        refetchType: 'none', // 캐시 무효화 시키지만 refetch는 바로 발생 안시킴(어차피 모달창 닫을 것이기 때문)
      }),
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
    onSuccess: handleSubmitSuccess,
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
