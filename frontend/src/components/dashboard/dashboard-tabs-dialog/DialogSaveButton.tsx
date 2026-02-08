import { Button } from '@/components/shared/shadcn-ui';

interface DialogSaveButtonProps {
  onClick: () => void;
}
export const DialogSaveButton = ({ onClick }: DialogSaveButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-grey-900 rounded-200 text-grey-50 body-medium-bold! w-20 px-350 py-200 pt-250"
    >
      저장
    </Button>
  );
};
