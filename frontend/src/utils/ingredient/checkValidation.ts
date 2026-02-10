interface CheckValidateParams {
  isIngredientRowEmpty: (index: number) => boolean;
  index: number;
  currentFieldValue: string;
}

// 각 input 필드의 유효성 검사 함수 (행 내 모든 input 비어있으면 통과, 필드값 입력되어 있지 않으면 실패)
export const checkValidation = ({
  isIngredientRowEmpty,
  index,
  currentFieldValue,
}: CheckValidateParams) => {
  if (isIngredientRowEmpty(index)) {
    return true;
  }
  // 필수 입력 이어야함
  return currentFieldValue.length > 0;
};
