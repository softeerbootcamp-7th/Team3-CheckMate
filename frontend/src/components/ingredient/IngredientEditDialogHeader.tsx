import { type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';

import { DialogHeader, DialogTitle } from '@/components/shared/shadcn-ui';
import type { IngredientFormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';

interface IngredientEditDialogHeaderProps {
  handleSubmit: UseFormHandleSubmit<IngredientFormValues>;
  onClickSubmit: (data: IngredientFormValues) => Promise<void>;
  onClickCancel: () => void;
  onError: (errors: FieldErrors<IngredientFormValues>) => void;
  isDirty: boolean;
  menuName: string;
}

export const IngredientEditDialogHeader = ({
  onClickCancel,
  handleSubmit,
  onClickSubmit,
  onError,
  isDirty,
  menuName,
}: IngredientEditDialogHeaderProps) => {
  return (
    <DialogHeader className="flex w-full flex-row items-center justify-between self-start">
      <DialogTitle className="!title-large-semibold text-grey-900">
        {menuName}
      </DialogTitle>
      <div className="flex gap-[14px]">
        <Button
          type="button"
          className="body-medium-semibold w-20 border-none px-350 py-200 focus:ring-0"
          onClick={onClickCancel}
        >
          취소
        </Button>
        <Button
          onClick={handleSubmit(onClickSubmit, onError)}
          className={cn(
            isDirty
              ? 'bg-grey-900 text-grey-50'
              : 'bg-grey-200 text-grey-400 pointer-events-none',
            'body-medium-bold w-20 border-none px-350 py-200',
          )}
        >
          저장
        </Button>
      </div>
    </DialogHeader>
  );
};
