import { SALES_SOURCE_COLORS } from '@/constants/sales';
import {
  CDN_BASE_URL,
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import type { SalesSource } from '@/types/sales';
import { cn, formatNumberInTenThousands } from '@/utils/shared';

interface SalesSourceChartLegendItemProps {
  salesSourceData: SalesSource;
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
}
export const SalesSourceChartLegendItem = ({
  salesSourceData,
  periodType,
}: SalesSourceChartLegendItemProps) => {
  return (
    <li
      className={cn(
        'grid w-full justify-between',
        periodType === PERIOD_PRESETS.dayWeekMonth.today
          ? `grid-cols-[83px_1fr_auto]`
          : 'grid-cols-2',
      )}
    >
      {/* 라벨 */}
      <div className="flex items-center gap-2">
        <div
          className="rounded-50 inline-block size-3.5"
          style={{
            backgroundColor:
              SALES_SOURCE_COLORS[salesSourceData.salesSourceType],
          }}
        />
        <span className="body-small-medium text-grey-900">
          {salesSourceData.salesSourceType}
        </span>
      </div>
      {/* 매출 */}
      <span
        className={cn(
          'body-small-medium text-grey-900',
          periodType === PERIOD_PRESETS.dayWeekMonth.today
            ? 'justify-self-start'
            : 'justify-self-end',
        )}
      >
        {formatNumberInTenThousands(salesSourceData.revenue)} (
        {salesSourceData.count}건)
      </span>
      {/* 변화율 */}
      {periodType === PERIOD_PRESETS.dayWeekMonth.today &&
        salesSourceData.changeRate !== undefined && (
          <span
            className={cn(
              'body-small-semibold text-brand-main justify-self-end',
              salesSourceData.changeRate < 0 && 'text-others-negative',
            )}
          >
            <object
              data={`${CDN_BASE_URL}/assets/images/${salesSourceData.changeRate >= 0 ? 'up' : 'down'}.svg`}
              className="inline size-4"
              aria-hidden="true"
            />
            {salesSourceData.changeRate > 0 ? '+' : ''}
            {salesSourceData.changeRate}%p
          </span>
        )}
    </li>
  );
};
