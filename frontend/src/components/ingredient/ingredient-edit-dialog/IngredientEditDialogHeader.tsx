import { useFormContext } from 'react-hook-form';

import { ButtonGroup } from '@/components/shared';
import { DialogHeader, DialogTitle } from '@/components/shared/shadcn-ui';
import type { IngredientFormValues } from '@/types/ingredient';

interface IngredientEditDialogHeaderProps {
  onClickCancel: () => void;
  menuName: string;
  isSubmitPending: boolean;
}

export const IngredientEditDialogHeader = ({
  onClickCancel,
  menuName,
  isSubmitPending,
}: IngredientEditDialogHeaderProps) => {
  const {
    formState: { isDirty },
  } = useFormContext<IngredientFormValues>();

  return (
    <DialogHeader className="flex w-full flex-row items-center justify-between self-start">
      <DialogTitle className="title-large-semibold! text-grey-900">
        {menuName}
      </DialogTitle>
      <ButtonGroup>
        <ButtonGroup.Negative
          type="button"
          onClick={onClickCancel}
          message="취소"
        />
        <ButtonGroup.Positive
          disabled={!isDirty || isSubmitPending} // 폼이 수정되지 않았거나 제출이 진행 중일 때는 저장 버튼 비활성화
          message="저장"
        />
      </ButtonGroup>
    </DialogHeader>
  );
};
