import { SALES_SOURCE_COLORS } from '@/constants/sales';
import { CDN_BASE_URL } from '@/constants/shared';
import type { SalesSource } from '@/types/sales';
import { cn } from '@/utils/shared';

interface SalesSourceChartLegendProps {
  salesSourceData: SalesSource[];
}

const formatNumberInTenThousands = (num: number) => {
  // 1억 이상이면 '억 원' 단위로 변환
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '억 원';
  }
  // '만 원' 단위로 변환
  return (num / 10000).toFixed(1) + '만 원';
};
export const SalesSourceChartLegend = ({
  salesSourceData,
}: SalesSourceChartLegendProps) => {
  return (
    <ul className="flex w-full flex-col gap-1">
      {salesSourceData
        .sort((a, b) => b.revenue - a.revenue)
        .map((data) => (
          <li key={data.salesSourceType} className="flex justify-between">
            <div className="flex w-fit shrink-0 items-center gap-2">
              <div
                className="rounded-50 inline-block size-3.5 shrink-0"
                style={{
                  backgroundColor: SALES_SOURCE_COLORS[data.salesSourceType],
                }}
              />
              <span className="body-small-medium text-grey-900 shrink-0">
                {data.salesSourceType}
              </span>
            </div>
            <span className="body-small-medium text-grey-900 align-baseline">
              {formatNumberInTenThousands(data.revenue)}({data.count}건)
            </span>
            {data.changeRate && (
              <span
                className={cn(
                  'body-small-semibold text-brand-main',
                  data.changeRate < 0 && 'text-others-negative',
                )}
              >
                <object
                  data={`${CDN_BASE_URL}/assets/images/${data.changeRate >= 0 ? 'up' : 'down'}.svg`}
                  className="inline size-4"
                />
                {data.changeRate > 0 ? '+' : ''}
                {data.changeRate}%p
              </span>
            )}
          </li>
        ))}
    </ul>
  );
};
