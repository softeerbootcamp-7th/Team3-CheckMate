import type { ReactNode } from 'react';

import { DoughnutChart } from '@/components/shared';
import type { SALES_SOURCE, SalesSourceValueType } from '@/constants/sales';
import { PERIOD_PRESETS } from '@/constants/shared';
import type { SalesSource, SalesSourceInsight } from '@/types/sales';
import type { DoughnutChartItem } from '@/types/shared';
import { getSalesSourceComparisonMessage } from '@/utils/sales';
import { cn, type ValueOf } from '@/utils/shared';

import { SalesSourceChartLegend } from '../sales-source';

interface DashboardSalesSourceContentProps {
  className?: string;
  children?: ReactNode;
}

export const DashboardSalesSourceContent = ({
  className,
  children,
}: DashboardSalesSourceContentProps) => {
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

interface DashboardSalesSourceContentComparisonMessageProps {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
  topTypeLabel: SalesSourceValueType;
  topShare: SalesSourceInsight<keyof typeof SALES_SOURCE>['topShare'];
  deltaShare: SalesSourceInsight<keyof typeof SALES_SOURCE>['deltaShare'];
}

export const DashboardSalesSourceContentComparisonMessage = ({
  periodType,
  topTypeLabel,
  topShare,
  deltaShare,
}: DashboardSalesSourceContentComparisonMessageProps) => {
  const comparisonMessageTokens = getSalesSourceComparisonMessage({
    periodType,
    topTypeLabel,
    topShare,
    deltaShare,
  });

  return (
    <p className="title-large-semibold w-full min-w-0">
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

interface DashboardSalesSourceContentDoughnutChartProps {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
  chartData: DoughnutChartItem[];
  salesSourceData: SalesSource[];
  title: string;
}

export const DashboardSalesSourceContentDoughnutChart = ({
  periodType,
  chartData,
  salesSourceData,
  title,
}: DashboardSalesSourceContentDoughnutChartProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center',
        periodType === PERIOD_PRESETS.dayWeekMonth.today
          ? // 최근 7일 텍스트 높이만큼 gap 조절
            'gap-[calc(46px-17.7px)]'
          : 'gap-11.5',
      )}
    >
      <div className="h-45 w-45">
        <DoughnutChart title={title} chartData={chartData} />
      </div>
      <SalesSourceChartLegend
        salesSourceData={salesSourceData}
        periodType={periodType}
      />
    </div>
  );
};

DashboardSalesSourceContent.ComparisonMessage =
  DashboardSalesSourceContentComparisonMessage;

DashboardSalesSourceContent.DoughnutChart =
  DashboardSalesSourceContentDoughnutChart;
