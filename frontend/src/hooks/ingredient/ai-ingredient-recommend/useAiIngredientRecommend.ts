import type { UseFieldArrayReplace } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { INGREDIENT_INPUT_MAX_LENGTH } from '@/constants/ingredient';
import { postAiIngredientRecommend } from '@/services/ingredient';
import type { IngredientFormValues, MenuIngredients } from '@/types/ingredient';

interface UseAiIngredientRecommendProps {
  fieldArrayReplace: UseFieldArrayReplace<IngredientFormValues, 'ingredients'>;
}

export const useAiIngredientRecommend = ({
  fieldArrayReplace,
}: UseAiIngredientRecommendProps) => {
  // AI 식자재 추천 API 요청이 성공했을 때 실행되는 함수
  const handleSuccess = (data: MenuIngredients) => {
    // 받아온 데이터가 input 글자수 제한보다 초과되는 경우 잘라내기
    const adjustedIngredients = data.ingredients.map((item) => ({
      ...item,
      name: item.name.slice(0, INGREDIENT_INPUT_MAX_LENGTH.INGREDIENT_NAME), // 식자재 이름의 경우 10글자 초과 시 자동 잘림
      quantity: item.quantity.slice(0, INGREDIENT_INPUT_MAX_LENGTH.QUANTITY), // 수량의 경우 5글자 초과 시 자동 잘림
    }));
    // 받아온 데이터 폼에 넣기
    fieldArrayReplace(adjustedIngredients);
  };
  const {
    mutate,
    isPending: isAiRecommendPending,
    // isError,
    // isSuccess,
  } = useMutation({
    mutationFn: postAiIngredientRecommend,
    onSuccess: handleSuccess,
    onError: () => {
      toast('식재료 자동완성에 실패했어요. 다시 시도해 주세요.');
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
