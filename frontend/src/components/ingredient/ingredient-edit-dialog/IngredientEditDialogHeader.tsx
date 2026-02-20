import { useFormContext } from 'react-hook-form';

import { ButtonGroup } from '@/components/shared';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/shadcn-ui';
import type { IngredientFormValues } from '@/types/ingredient';

interface IngredientEditDialogHeaderProps {
  onClickCancel: () => void;
  menuName: string;
}

export const IngredientEditDialogHeader = ({
  onClickCancel,
  menuName,
}: IngredientEditDialogHeaderProps) => {
  const {
    formState: { isDirty },
  } = useFormContext<IngredientFormValues>();

  return (
    <DialogHeader className="flex w-full flex-row items-center justify-between self-start">
      <DialogTitle className="title-large-semibold! text-grey-900">
        {menuName}
      </DialogTitle>
      <DialogDescription className="sr-only">
        메뉴에 등록된 식자재 정보를 수정하는 다이얼로그
      </DialogDescription>
      <ButtonGroup>
        <ButtonGroup.Negative
          type="button"
          onClick={onClickCancel}
          message="취소"
        />
        <ButtonGroup.Positive disabled={!isDirty} message="저장" />
      </ButtonGroup>
    </DialogHeader>
  );
};
