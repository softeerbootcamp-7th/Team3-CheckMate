import { useMemo } from 'react';

import { DefaultCardWrapper } from '@/components/shared';
import { getPeriodComparisonMessage } from '@/utils/sales';
import { cn, formatNumber } from '@/utils/shared';

import { usePeriodTypeContext } from '../period-type-provider';

interface SalesComparisonProps {
  title: string;
  unit: string;
  differenceAmount: number;
  currentValue: number;
}
export const SalesComparison = ({
  title,
  unit,
  differenceAmount,
  currentValue,
}: SalesComparisonProps) => {
  const { periodType } = usePeriodTypeContext();

  const comparisonMessage = useMemo(
    () =>
      periodType
        ? getPeriodComparisonMessage(periodType)
        : '비교할 기준이 없어요.',
    [periodType],
  );

  return (
    <DefaultCardWrapper title={title} className="h-57">
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
          differenceAmount < 0 && 'text-others-negative',
          differenceAmount === 0 && 'text-grey-500',
        )}
      >
        {differenceAmount >= 0 && '+'}
        {formatNumber(differenceAmount ?? 0)}
        {unit}
      </p>
    </DefaultCardWrapper>
  );
};
