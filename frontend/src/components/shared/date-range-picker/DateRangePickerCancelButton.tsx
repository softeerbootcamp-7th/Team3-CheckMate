import { Button } from '../shadcn-ui';

interface DateRangePickerCancelButtonProps {
  handleCancel: () => void;
}

export const DateRangePickerCancelButton = ({
  handleCancel,
}: DateRangePickerCancelButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="bg-grey-200 text-grey-700 w-19"
      onClick={handleCancel}
      aria-label="기간 설정 취소"
    >
      취소
    </Button>
  );
};
