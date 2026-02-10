interface UseIngredientEditSubmitParams {
  onOpenChange: (open: boolean) => void;
}

export const useIngredientEditSubmit = ({
  onOpenChange,
}: UseIngredientEditSubmitParams) => {
  const onSubmit = async () => {
    //( data: IngredientFormValues )
    // TODO: fetch 저장
    onOpenChange(false);
  };

  return { onSubmit };
};
