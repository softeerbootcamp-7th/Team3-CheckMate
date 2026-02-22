import {
  DefaultCardFetchBoundary,
  DefaultCardWrapper,
} from '@/components/shared';

import { CategorySalesChart } from './CategorySalesChart';

export const CategorySalesCard = () => {
  return (
    <DefaultCardFetchBoundary className="h-68 flex-1">
      <DefaultCardWrapper
        aria-label="카테고리별 매출"
        className="flex h-68 flex-1 gap-5"
        title="카테고리별 매출"
      >
        <CategorySalesChart />
      </DefaultCardWrapper>
    </DefaultCardFetchBoundary>
  );
};
