import { cn } from '@/utils/shared';

import { NextPaginationButton } from './NextPaginationButton';
import { PrevPaginationButton } from './PrevPaginationButton';

interface IngredientPaginationBarProps {
  currentPage: number;
  totalPageCount: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  handleClickPrev: () => void;
  handleClickNext: () => void;
  handleClickPage: (page: number) => void;
}

export const IngredientPaginationBar = ({
  currentPage,
  totalPageCount,
  isFirstPage,
  isLastPage,
  handleClickPrev,
  handleClickNext,
  handleClickPage,
}: IngredientPaginationBarProps) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <PrevPaginationButton
        isFirstPage={isFirstPage}
        handleClickPrev={handleClickPrev}
      />

      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalPageCount }, (_, idx) => (
          <button
            key={idx}
            className={cn(
              'size-10 cursor-pointer p-2.5',
              currentPage === idx + 1 ? 'text-grey-900' : 'text-grey-500',
            )}
            onClick={() => handleClickPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <NextPaginationButton
        isLastPage={isLastPage}
        handleClickNext={handleClickNext}
      />
    </div>
  );
};
