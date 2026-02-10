import { Button } from '@/components/shared/shadcn-ui';

interface DialogCancelButtonProps {
  onClick: () => void;
}

export const DialogCancelButton = ({ onClick }: DialogCancelButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-200 text-grey-700 body-medium-bold! w-20 px-350 py-200"
    >
      취소
    </Button>
  );
};
