import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

import { NextPaginationButton } from './NextPaginationButton';
import { PrevPaginationButton } from './PrevPaginationButton';

interface PaginationBarProps {
  currentPage: number;
  totalPageCount: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  handleClickPrev: () => void;
  handleClickNext: () => void;
  handleClickPage: (page: number) => void;
}

export const PaginationBar = ({
  currentPage,
  totalPageCount,
  isFirstPage,
  isLastPage,
  handleClickPrev,
  handleClickNext,
  handleClickPage,
}: PaginationBarProps) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <PrevPaginationButton
        isFirstPage={isFirstPage}
        handleClickPrev={handleClickPrev}
      />

      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalPageCount }, (_, idx) => (
          <Button
            key={idx}
            className={cn(
              'size-10 cursor-pointer p-2.5',
              currentPage === idx + 1 ? 'text-grey-900' : 'text-grey-500',
            )}
            onClick={() => handleClickPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>
      <NextPaginationButton
        isLastPage={isLastPage}
        handleClickNext={handleClickNext}
      />
    </div>
  );
};
