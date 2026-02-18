import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { ORDER_COUNT, SALES_UNIT } from '@/constants/sales';
import type { GetOrderCountResponseDto } from '@/types/sales';
import { getMetricTrend } from '@/utils/dashboard';
import { getSalesCurrentComparisonMessage } from '@/utils/sales';

import { CurrentSalesContent } from './CurrentSalesContent';

const {
  METRIC_LABEL,
  MIN_CHANGE_RATE,
  MAX_CHANGE_RATE,
  EXAMPLE_AMOUNT,
  EXAMPLE_CHANGE_RATE,
  EXAMPLE_HAS_PREVIOUS_DATA,
} = ORDER_COUNT;

type OrderCountCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.ORDER_COUNT
>;

interface OrderCountContentProps extends Omit<
  GetOrderCountResponseDto,
  'differenceOrderCount'
> {
  cardCode: OrderCountCardCodes;
  className?: string;
}

export const OrderCountContent = ({
  cardCode,
  orderCount = EXAMPLE_AMOUNT,
  changeRate = EXAMPLE_CHANGE_RATE,
  hasPreviousData = EXAMPLE_HAS_PREVIOUS_DATA,
  className,
}: OrderCountContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const metricTrend = getMetricTrend({
    comparisonAmount: changeRate,
    minValue: MIN_CHANGE_RATE,
    maxValue: MAX_CHANGE_RATE,
  });

  const comparisonMessageTokens = getSalesCurrentComparisonMessage({
    periodType,
    hasPreviousData,
    metricTrend,
    metricLabel: METRIC_LABEL,
    comparisonAmount: changeRate,
    unit: SALES_UNIT.PERCENT,
  });
  return (
    <CurrentSalesContent className={className}>
      <CurrentSalesContent.TrendBadge trend={metricTrend} />
      <CurrentSalesContent.Amount amount={orderCount} unit={SALES_UNIT.ORDER} />
      <CurrentSalesContent.ComparisonMessage
        comparisonMessageTokens={comparisonMessageTokens}
      />
    </CurrentSalesContent>
  );
};
