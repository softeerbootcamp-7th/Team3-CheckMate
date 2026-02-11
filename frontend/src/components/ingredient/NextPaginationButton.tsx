import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface NextPaginationButtonProps {
  isLastPage: boolean;
  handleClickNext: () => void;
}
export const NextPaginationButton = ({
  isLastPage,
  handleClickNext,
}: NextPaginationButtonProps) => {
  return (
    <Button
      onClick={handleClickNext}
      disabled={isLastPage}
      className={cn(
        'rounded-unlimit bg-special-card-bg text-grey-600 size-6 cursor-pointer',
        isLastPage && 'text-grey-400',
      )}
    >
      <ChevronRight className="size-6" />
    </Button>
  );
};
