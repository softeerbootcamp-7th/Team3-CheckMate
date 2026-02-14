import { type ReactNode, useMemo } from 'react';

import { METRIC_TREND, type MetricTrend } from '@/constants/dashboard';
import { CDN_BASE_URL } from '@/constants/shared';
import { cn, formatNumber } from '@/utils/shared';

interface CurrentSalesContentProps {
  className?: string;
  children?: ReactNode;
}

export const CurrentSalesContent = ({
  children,
  className,
}: CurrentSalesContentProps) => {
  return (
    <div
      className={cn(
        'flex w-75 flex-col items-start justify-start gap-1',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CurrentSalesTrendBadgeProps {
  trend: MetricTrend;
}

const CurrentSalesTrendBadge = ({ trend }: CurrentSalesTrendBadgeProps) => {
  const iconSrc = useMemo(() => {
    switch (trend) {
      case METRIC_TREND.UP:
        return '/assets/images/graph_up.svg';
      case METRIC_TREND.DOWN:
        return '/assets/images/graph_down.svg';
      default:
        return null;
    }
  }, [trend]);

  if (!iconSrc) {
    return <div className="size-6" />;
  }

  return <object data={`${CDN_BASE_URL}${iconSrc}`} className="size-6" />;
};

interface CurrentSalesContentAmountProps {
  amount: number;
  unit: string;
  className?: string;
}

const CurrentSalesContentAmount = ({
  amount,
  unit,
  className,
}: CurrentSalesContentAmountProps) => {
  return (
    <span className={cn('flex items-center gap-1', className)}>
      <span className="title-medium-semibold text-grey-900">
        {formatNumber(amount)}
      </span>
      <span className="title-medium-semibold text-grey-900">{unit}</span>
    </span>
  );
};

interface CurrentSalesContentComparisonMessageProps {
  comparisonMessage: string;
  changeRateMessage?: string;
  metricTrend: MetricTrend;
  className?: string;
}

const CurrentSalesContentComparisonMessage = ({
  comparisonMessage,
  changeRateMessage,
  metricTrend,
  className,
}: CurrentSalesContentComparisonMessageProps) => {
  return (
    <p className={cn('flex flex-col', className)}>
      {comparisonMessage}
      {changeRateMessage && (
        <strong
          className={cn(
            'ml-1',
            metricTrend === METRIC_TREND.UP && 'text-brand-main',
            metricTrend === METRIC_TREND.DOWN && 'text-others-negative',
            metricTrend === METRIC_TREND.SAME && 'text-grey-500',
          )}
        >
          {changeRateMessage}
        </strong>
      )}
    </p>
  );
};

CurrentSalesContent.TrendBadge = CurrentSalesTrendBadge;
CurrentSalesContent.Amount = CurrentSalesContentAmount;
CurrentSalesContent.ComparisonMessage = CurrentSalesContentComparisonMessage;
