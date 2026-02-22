import { RANKING_COLORS } from '@/constants/shared/doughnut-chart';
import type { DoughnutChartItem } from '@/types/shared';
import { formatNumber } from '@/utils/shared';

interface CategorySalesChartLegendProps<T> {
  chartData: T[];
}
export const CategorySalesChartLegend = <T extends DoughnutChartItem>({
  chartData,
}: CategorySalesChartLegendProps<T>) => {
  return (
    <ul className="flex flex-1 flex-col gap-1">
      {[...chartData]
        .sort((a, b) => b.value - a.value)
        .map((data, index) => (
          <li key={data.label} className="flex justify-between">
            <div className="flex w-fit shrink-0 items-center gap-2">
              <div
                className="rounded-50 inline-block size-3.5 shrink-0"
                style={{
                  backgroundColor:
                    data.color ?? RANKING_COLORS[index % RANKING_COLORS.length],
                }}
              />
              <span className="body-small-medium text-grey-900 shrink-0">
                {data.label}
              </span>
            </div>
            <span className="body-small-medium text-grey-900">
              {formatNumber(data.value)}%
            </span>
          </li>
        ))}
    </ul>
  );
};
