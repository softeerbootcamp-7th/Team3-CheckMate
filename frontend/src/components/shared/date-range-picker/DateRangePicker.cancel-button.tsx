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
    >
      취소
    </Button>
  );
};
