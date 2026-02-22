import { RANKING_COLORS } from '@/constants/shared/doughnut-chart';
import type { DoughnutChartItem } from '@/types/shared';

import { CategorySalesChartLegendItem } from './CategorySalesChartLegendItem';

interface CategorySalesChartLegendProps<T> {
  chartData: T[];
}
export const CategorySalesChartLegend = <T extends DoughnutChartItem>({
  chartData,
}: CategorySalesChartLegendProps<T>) => {
  return (
    <ul className="flex flex-1 flex-col gap-1">
      {chartData.map((data, index) => (
        <CategorySalesChartLegendItem
          key={data.label}
          label={data.label}
          value={data.value}
          color={RANKING_COLORS[index]}
        />
      ))}
    </ul>
  );
};
