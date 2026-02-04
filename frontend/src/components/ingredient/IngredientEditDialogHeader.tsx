import { type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';

import type { FormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';
import { DialogHeader, DialogTitle } from '../shared/shadcn-ui/dialog';

interface IngredientEditDialogHeaderProps {
  onOpenChange: (open: boolean) => void;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
  onError: (errors: FieldErrors<FormValues>) => void;
  isDirty: boolean;
  menuName: string;
}

export const IngredientEditDialogHeader = ({
  onOpenChange,
  handleSubmit,
  onSubmit,
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
          onClick={() => onOpenChange(false)}
        >
          취소
        </Button>
        <Button
          onClick={handleSubmit(onSubmit, onError)}
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
