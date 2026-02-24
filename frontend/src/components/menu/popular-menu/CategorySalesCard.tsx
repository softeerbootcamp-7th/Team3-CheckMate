import { DefaultCardWrapper } from '@/components/shared';
import { RefreshedTimeButton } from '@/components/shared';
import { useCategorySales } from '@/hooks/menu';

import { CategorySalesChart } from './CategorySalesChart';
import { usePopularMenuPeriodType } from './period-type-provider';

export const CategorySalesCard = () => {
  const { periodType, startDate, endDate } = usePopularMenuPeriodType();

  const { queryKey, isEmptyCategorySales, categorySalesChartData } =
    useCategorySales({
      periodType,
      startDate,
      endDate,
    });
  return (
    <DefaultCardWrapper
      aria-label="카테고리별 매출"
      className="flex h-80 flex-1 justify-between gap-5"
      title="카테고리별 매출"
    >
      <div>
        <CategorySalesChart
          categorySalesChartData={categorySalesChartData}
          isEmptyCategorySales={isEmptyCategorySales}
        />
        <RefreshedTimeButton queryKey={queryKey} />
      </div>
    </DefaultCardWrapper>
  );
};
