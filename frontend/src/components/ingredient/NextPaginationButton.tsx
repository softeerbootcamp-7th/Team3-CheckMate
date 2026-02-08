import { ChevronRight } from 'lucide-react';

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
    <button
      onClick={handleClickNext}
      className={cn(
        'rounded-unlimit bg-special-card-bg text-grey-600 size-6 cursor-pointer',
        isLastPage && 'text-grey-400 pointer-events-none',
      )}
    >
      <ChevronRight className="size-6" />
    </button>
  );
};
