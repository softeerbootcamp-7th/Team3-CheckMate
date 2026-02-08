import EditIcon from '@/assets/icons/edit.svg?react';
import { Button } from '@/components/shared/shadcn-ui';

interface TabEditButtonProps {
  onClick: () => void;
  disabled: boolean;
}
export const TabEditButton = ({ onClick, disabled }: TabEditButtonProps) => {
  return (
    <Button
      onClick={onClick}
      aria-label="수정"
      disabled={disabled}
      className="p-0!"
    >
      <EditIcon className="text-grey-600 disabled:text-grey-400 size-6" />
    </Button>
  );
};
