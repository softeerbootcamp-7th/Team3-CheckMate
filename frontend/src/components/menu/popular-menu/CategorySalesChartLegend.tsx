import { RANKING_COLORS } from '@/constants/shared';
import type { DoughnutChartItem } from '@/types/shared';

import { CategorySalesChartLegendItem } from './CategorySalesChartLegendItem';

interface CategorySalesChartLegendProps {
  chartData: DoughnutChartItem[];
  isEmpty?: boolean;
}
export const CategorySalesChartLegend = ({
  chartData,
  isEmpty = false,
}: CategorySalesChartLegendProps) => {
  return (
    <ul className="flex flex-1 flex-col gap-1">
      {isEmpty ? (
        <CategorySalesChartLegendItem
          label="-"
          value={-1}
          color={RANKING_COLORS[RANKING_COLORS.length - 1]}
        />
      ) : (
        chartData.map((data, index) => (
          <CategorySalesChartLegendItem
            key={data.label}
            label={data.label}
            value={data.value}
            color={RANKING_COLORS[index]}
          />
        ))
      )}
    </ul>
  );
};
