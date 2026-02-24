import { useMemo } from 'react';

import type { QueryKey } from '@tanstack/react-query';

import { DefaultCardWrapper } from '@/components/shared';
import { RefreshedTimeButton } from '@/components/shared/refreshed-time-button/RefreshedTimeButton';
import { getPeriodComparisonMessage } from '@/utils/sales';
import { cn, formatNumber } from '@/utils/shared';

import { usePeriodTypeContext } from '../period-type-provider';

interface SalesComparisonProps {
  title: string;
  unit: string;
  differenceAmount: number;
  currentValue: number;
  queryKey: QueryKey;
}
export const SalesComparison = ({
  title,
  unit,
  differenceAmount,
  currentValue,
  queryKey,
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
    <DefaultCardWrapper title={title} className="h-70">
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
        {formatNumber(differenceAmount)}
        {unit}
      </p>
      <RefreshedTimeButton queryKey={queryKey} />
    </DefaultCardWrapper>
  );
};
