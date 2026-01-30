import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface DateRangePickerSaveButtonProps {
  disabled?: boolean;
  handleSave: () => void;
}

export const DateRangePickerSaveButton = ({
  disabled = false,
  handleSave,
}: DateRangePickerSaveButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-19',
        disabled ? 'bg-grey-300 text-grey-500' : 'bg-grey-900 text-grey-50',
      )}
      onClick={handleSave}
      disabled={disabled}
      aria-label="기간 설정 저장"
    >
      저장
    </Button>
  );
};
