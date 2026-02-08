import {
  type PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import type { SalesSource } from '@/types/sales';

import { SalesSourceChartLegendItem } from './SalesSourceChartLegendItem';

interface SalesSourceChartLegendProps {
  salesSourceData: SalesSource[];
  periodType: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
}

export const SalesSourceChartLegend = ({
  salesSourceData,
  periodType,
}: SalesSourceChartLegendProps) => {
  return (
    <ul className="mt-auto flex w-full flex-col gap-1">
      {periodType === PERIOD_PRESETS.dayWeekMonth.today && (
        <span className="text-grey-500 caption-large-medium text-right">
          최근 7일 평균 대비
        </span>
      )}
      {salesSourceData.map((data) => (
        <SalesSourceChartLegendItem
          key={data.salesSourceType}
          data={data}
          periodType={periodType}
        />
      ))}
    </ul>
  );
};
