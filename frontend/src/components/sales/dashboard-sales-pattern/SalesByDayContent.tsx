import { BarChart } from '@/components/shared/bar-chart';
import { SALES_BY_DAY } from '@/constants/sales';
import type { SalesByDayItem, SalesByDaySummary } from '@/types/sales';
import { getSalesPatternByDayMessage } from '@/utils/sales';
import { cn } from '@/utils/shared';

const { CHART_X_UNIT, CHART_Y_UNIT, CHART_COLOR } = SALES_BY_DAY;

interface SalesByDayContentProps extends SalesByDaySummary {
  salesByDayItems: SalesByDayItem[];
  className?: string;
}

export const SalesByDayContent = ({
  salesByDayItems,
  topDay,
  isSignificant,
  className,
}: SalesByDayContentProps) => {
  const salesByDayBriefingMessage = getSalesPatternByDayMessage({
    topDay,
    isSignificant,
  });

  const salesByDaySeries = {
    data: {
      mainX: salesByDayItems.map((item) => ({
        amount: item.day,
        unit: CHART_X_UNIT,
      })),
      mainY: salesByDayItems.map((item) => ({
        amount: item.avgNetAmount ?? 0,
        unit: CHART_Y_UNIT,
      })),
    },
    color: CHART_COLOR,
  };

  const activeDataIndex = salesByDayItems.findIndex(
    (item) => item.day === topDay,
  );

  return (
    <article
      className={cn(
        '-mt-4.5 flex w-75 flex-col items-start justify-start gap-1.75',
        className,
      )}
    >
      <BarChart
        viewBoxWidth={300}
        viewBoxHeight={90}
        primarySeries={salesByDaySeries}
        hasXAxis
        hasBarGradient
        yGuideLineCount={4}
        showBarLabel={false}
        barColorChangeOnHover={false}
        activeDataIndex={activeDataIndex === -1 ? undefined : activeDataIndex}
        xAxisType="default"
      />
      <p className="title-medium-semibold w-full min-w-0">
        {salesByDayBriefingMessage.map(
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
    </article>
  );
};
