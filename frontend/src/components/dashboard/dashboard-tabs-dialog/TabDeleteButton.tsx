import TrashIcon from '@/assets/icons/trash.svg?react';
import { Button } from '@/components/shared/shadcn-ui';

interface TabDeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const TabDeleteButton = ({
  onClick,
  disabled,
}: TabDeleteButtonProps) => {
  return (
    <Button
      onClick={onClick}
      aria-label="탭 삭제"
      disabled={disabled}
      className="p-0!"
    >
      <TrashIcon className="text-grey-600 disabled:text-grey-400 size-6" />
    </Button>
  );
};
