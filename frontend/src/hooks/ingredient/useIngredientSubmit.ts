import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TOAST_DEFAULT } from '@/constants/shared';
import { ingredientKeys, postIngredientRegister } from '@/services/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

interface UseIngredientEditSubmitParams {
  menuId: number;
  onOpenChange: (open: boolean) => void;
}

export const useIngredientEditSubmit = ({
  menuId,
  onOpenChange,
}: UseIngredientEditSubmitParams) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isSubmitPending } = useMutation({
    mutationFn: postIngredientRegister,
    onSuccess: () => {
      // 식자재 등록 후 해당 메뉴의 식자재 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.menuIngredients(menuId),
      });
      // 식자재 등록 후 매장에 등록된 메뉴 목록 다시 불러와야 함
      // 메뉴 목록에서 화면에 보여지는 hasIngredient('등록된 식자재 존재 유무') 정보가 바뀌기 때문
      // 메뉴 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.registeredMenus(),
      });
      onOpenChange(false); // 모달 창 닫기
    },
    onError: () => {
      // 서버와 통신 실패했다면 토스트 띄우기
      toast('식재료 등록에 실패했어요. 다시 시도해 주세요', {
        duration: TOAST_DEFAULT.DURATION, // 3.5초 동안 띄워져있음
        position: TOAST_DEFAULT.POSITION,
        className: TOAST_DEFAULT.STYLE,
      });
    },
  });
  const onSubmit = async (data: IngredientFormValues) => {
    // 모든 필드가 채워진 데이터만 서버에 보내야함
    const filteredIngredients = data.ingredients.filter((ingredient) =>
      Object.values(ingredient).every(
        (value) => String(value).trim().length > 0,
      ),
    );
    mutate({ menuId, menuIngredients: filteredIngredients });
  };

  return { onSubmit, isSubmitPending };
};
