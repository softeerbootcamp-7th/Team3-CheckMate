import PlusIcon from '@/assets/icons/plus.svg?react';
import { Button } from '@/components/shared/shadcn-ui';

interface TabAddButtonProps {
  onClick: () => void;
}
export const TabAddButton = ({ onClick }: TabAddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="border-grey-300 rounded-250 text-grey-500! body-medium-semibold! flex h-14.5 items-center justify-start border p-300"
    >
      <PlusIcon className="text-grey-500! size-5" />
      대시보드 추가
    </Button>
  );
};
