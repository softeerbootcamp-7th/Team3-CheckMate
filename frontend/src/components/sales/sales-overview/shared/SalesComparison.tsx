import { useMemo } from 'react';

import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { getPeriodComparisonMessage } from '@/utils/sales';
import { cn, formatNumber } from '@/utils/shared';

interface SalesComparisonProps {
  periodType: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined; // 오늘 / 이번주/ 이번달
  title: string;
  unit: string;
  lastValue?: number;
  currentValue: number;
}
export const SalesComparison = ({
  periodType,
  title,
  unit,
  lastValue,
  currentValue,
}: SalesComparisonProps) => {
  const deltaValue = useMemo(
    () => (lastValue ? currentValue - lastValue : 0),
    [currentValue, lastValue],
  );

  const comparisonMessage = useMemo(
    () =>
      periodType
        ? getPeriodComparisonMessage(periodType)
        : '비교할 기준이 없어요.',
    [periodType],
  );

  return (
    <article className="card h-57">
      <h3>{title}</h3>
      <div className="mt-12 mb-5 flex items-center gap-1">
        <strong className="headline-medium-semibold">
          {formatNumber(currentValue)}
        </strong>
        <p className="title-medium-semibold text-grey-900">{unit}</p>
      </div>

      <p className="body-medium-medium text-grey-600 whitespace-pre">
        {comparisonMessage}
      </p>
      <p
        className={cn(
          'body-large-semibold text-brand-main mt-1',
          deltaValue < 0 && 'text-others-negative',
          deltaValue === 0 && 'text-grey-500',
        )}
      >
        {deltaValue >= 0 && '+'}
        {formatNumber(deltaValue)}
        {unit}
      </p>
    </article>
  );
};
