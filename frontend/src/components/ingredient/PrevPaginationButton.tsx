import { ChevronLeft } from 'lucide-react';

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
    <button
      onClick={handleClickPrev}
      className={cn(
        'rounded-unlimit bg-special-card-bg text-grey-600 size-6 cursor-pointer',
        isFirstPage && 'text-grey-400 pointer-events-none',
      )}
    >
      <ChevronLeft className="size-6" />
    </button>
  );
};
