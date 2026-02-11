import {
  PERIOD_PRESET_KEYS,
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
    <div className="mt-auto w-full">
      {periodType === PERIOD_PRESETS.dayWeekMonth.today && (
        <span className="text-grey-500 caption-large-medium block w-full text-right">
          최근 7일 평균 대비
        </span>
      )}
      <ul className="mt-1 flex flex-col gap-1">
        {salesSourceData.map((data) => (
          <SalesSourceChartLegendItem
            key={data.salesSourceType}
            salesSourceData={data}
            periodType={periodType}
          />
        ))}
      </ul>
    </div>
  );
};
