import type { ReactNode } from 'react';

import type { PERIOD_PRESETS } from '@/constants/shared';
import type { SalesIncomeStructureInsight } from '@/types/sales/salesIncomeStructureInsight';
import { getSalesIncomeStructureComparisionMessage } from '@/utils/dashboard';
import { cn, type ValueOf } from '@/utils/shared';

interface DashboardSalesIncomeContentProps {
  className?: string;
  children?: ReactNode;
}

export const DashboardSalesIncomeContent = ({
  className,
  children,
}: DashboardSalesIncomeContentProps) => {
  return (
    <article
      className={cn(
        'flex w-75 flex-col items-start justify-start gap-4',
        className,
      )}
    >
      {children}
    </article>
  );
};

interface DashboardSalesIncomeContentComparisonMessageProps {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
  topType: SalesIncomeStructureInsight['topType'];
  topShare: SalesIncomeStructureInsight['topShare'];
  deltaShare: SalesIncomeStructureInsight['deltaShare'];
}

export const DashboardSalesIncomeContentComparisonMessage = ({
  periodType,
  topType,
  topShare,
  deltaShare,
}: DashboardSalesIncomeContentComparisonMessageProps) => {
  const comparisonMessageTokens = getSalesIncomeStructureComparisionMessage({
    periodType,
    topType,
    topShare,
    deltaShare,
  });

  return (
    <p className="title-large-semibold w-full min-w-0">
      {comparisonMessageTokens.map(({ text, isHighlight }, index) => {
        return (
          <span
            key={index}
            className={cn(
              'break-keep whitespace-pre-wrap',
              isHighlight ? 'text-brand-main' : 'text-grey-900',
            )}
          >
            {text}
          </span>
        );
      })}
    </p>
  );
};

DashboardSalesIncomeContent.ComparisonMessage =
  DashboardSalesIncomeContentComparisonMessage;
