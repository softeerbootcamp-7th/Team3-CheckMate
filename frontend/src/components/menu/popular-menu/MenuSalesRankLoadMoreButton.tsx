import { Button } from '@/components/shared/shadcn-ui';

interface MenuSalesRankLoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const MenuSalesRankLoadMoreButton = ({
  onClick,
  disabled = false,
}: MenuSalesRankLoadMoreButtonProps) => {
  return (
    <Button
      className="rounded-200 bg-grey-100 text-grey-600 body-medium-semibold! flex h-10 w-full items-center justify-center py-2.5"
      onClick={onClick}
      disabled={disabled}
    >
      더보기
    </Button>
  );
};
