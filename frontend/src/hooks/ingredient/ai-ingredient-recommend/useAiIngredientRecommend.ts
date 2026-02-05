import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postAiIngredientRecommend } from '@/services/ ingredient';
import type { PostAiIngredientRecommendResponseDto } from '@/types/ingredient';

export const useAiIngredientRecommend = () => {
  const {
    mutate,
    isPending: isAiRecommendPending,
    // isError,
    // isSuccess,
  } = useMutation({
    mutationFn: postAiIngredientRecommend,
    onSuccess: (data: PostAiIngredientRecommendResponseDto) => {
      // 성공하면 받아온 데이터 폼에 넣기
      // AI 자동완성은 식자재 필드에 아무 값도 없을때만 가능 -> 필드 청소할 필요 없이 그냥 append만 해주면 됨
      data.ingredients.forEach((ingredient) => {
        fieldArrayMethods.append(ingredient);
      });
    },
    onMutate: () => {},
    onError: () => {
      toast('식재료 자동완성에 실패했어요. 다시 시도해 주세요.', {
        position: 'bottom-center',
      });
    },
    onSettled: () => {},
  });
  return {
    isAiRecommendPending,
    mutate,
  };
};
