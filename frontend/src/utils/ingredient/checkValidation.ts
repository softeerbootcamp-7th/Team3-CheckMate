interface CheckValidateParams {
  isIngredientRowEmpty: (index: number) => boolean;
  index: number;
  currentFieldValue: string | number | null;
}

// 각 input 필드의 유효성 검사 함수 (행 내 모든 input 비어있으면 통과, 필드값 입력되어 있지 않으면 실패)
export const checkValidation = ({
  isIngredientRowEmpty,
  index,
  currentFieldValue,
}: CheckValidateParams) => {
  // 해당 행 모든 input이 비어있는 경우 -> 유효성 검사 통과
  if (isIngredientRowEmpty(index)) {
    return true;
  }
  // 필수 입력 이어야함
  return currentFieldValue !== null && String(currentFieldValue).length > 0;
};
