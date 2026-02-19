import type { UseFieldArrayReplace } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TOAST_DEFAULT } from '@/constants/shared';
import { postAiIngredientRecommend } from '@/services/ingredient';
import type { IngredientFormValues, MenuIngredients } from '@/types/ingredient';

interface UseAiIngredientRecommendProps {
  fieldArrayReplace: UseFieldArrayReplace<IngredientFormValues, 'ingredients'>;
}

export const useAiIngredientRecommend = ({
  fieldArrayReplace,
}: UseAiIngredientRecommendProps) => {
  const {
    mutate,
    isPending: isAiRecommendPending,
    // isError,
    // isSuccess,
  } = useMutation({
    mutationFn: postAiIngredientRecommend,
    onSuccess: (data: MenuIngredients) => {
      // 성공하면 받아온 데이터 폼에 넣기
      fieldArrayReplace(data.ingredients);
    },
    onError: () => {
      toast('식재료 자동완성에 실패했어요. 다시 시도해 주세요.', {
        duration: TOAST_DEFAULT.DURATION,
        position: TOAST_DEFAULT.POSITION,
        className: TOAST_DEFAULT.STYLE,
      });
    },
  });
  const requestAiIngredientRecommend = (menuId: number) => {
    // 이전 요청이 아직 처리 중이면 중복 요청 방지
    if (isAiRecommendPending) {
      return;
    }
    mutate({ menuId });
  };
  return {
    isAiRecommendPending,
    requestAiIngredientRecommend,
  };
};
