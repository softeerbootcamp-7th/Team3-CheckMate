import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface PrevPaginationButtonProps {
  isFirstPage: boolean;
  handleClickPrev: () => void;
}
export const PrevPaginationButton = ({
  isFirstPage,
  handleClickPrev,
}: PrevPaginationButtonProps) => {
  return (
    <Button
      onClick={handleClickPrev}
      disabled={isFirstPage}
      className={cn(
        'rounded-unlimit bg-special-card-bg text-grey-600 size-6 cursor-pointer',
        isFirstPage && 'text-grey-400',
      )}
    >
      <ChevronLeft className="size-6" />
    </Button>
  );
};
