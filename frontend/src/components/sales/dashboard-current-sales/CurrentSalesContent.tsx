import { type ReactNode, useMemo } from 'react';

import { METRIC_TREND, type MetricTrend } from '@/constants/dashboard';
import { CDN_BASE_URL } from '@/constants/shared';
import type { MessageToken } from '@/utils/sales/dashboard/createMessageToken';
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
    <article
      className={cn(
        '-mt-1 flex w-75 flex-col items-start justify-start gap-1',
        className,
      )}
    >
      {children}
    </article>
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
      case METRIC_TREND.SAME:
        return '/assets/images/graph_same.svg';
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
      <span className="headline-medium-bold text-grey-900">
        {formatNumber(amount)}
      </span>
      <span className="title-medium-semibold text-grey-900">{unit}</span>
    </span>
  );
};

interface CurrentSalesContentComparisonMessageProps {
  comparisonMessageTokens: MessageToken[];
  className?: string;
}

const CurrentSalesContentComparisonMessage = ({
  comparisonMessageTokens,
  className,
}: CurrentSalesContentComparisonMessageProps) => {
  return (
    <p className={cn('title-large-semibold', className)}>
      {comparisonMessageTokens.map(
        ({ text, isHighlight, highlightColor }, index) => {
          return (
            <span
              key={index}
              className={cn(
                'text-grey-900 break-keep whitespace-pre-wrap',
                isHighlight && highlightColor,
              )}
            >
              {text}
            </span>
          );
        },
      )}
    </p>
  );
};

CurrentSalesContent.TrendBadge = CurrentSalesTrendBadge;
CurrentSalesContent.Amount = CurrentSalesContentAmount;
CurrentSalesContent.ComparisonMessage = CurrentSalesContentComparisonMessage;
