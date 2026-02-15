import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { REAL_SALES, SALES_UNIT } from '@/constants/sales';
import type { GetRealTimeSalesResponseDto } from '@/types/sales';
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
} = REAL_SALES;

type RealSalesCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.REAL_SALES
>;

interface RealSalesContentProps extends Omit<
  GetRealTimeSalesResponseDto,
  'differenceAmount'
> {
  cardCode: RealSalesCardCodes;
  className?: string;
}

export const RealSalesContent = ({
  cardCode,
  netAmount = EXAMPLE_AMOUNT,
  changeRate = EXAMPLE_CHANGE_RATE,
  hasPreviousData = EXAMPLE_HAS_PREVIOUS_DATA,
  className,
}: RealSalesContentProps) => {
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
      <CurrentSalesContent.Amount amount={netAmount} unit={SALES_UNIT.WON} />
      <CurrentSalesContent.ComparisonMessage
        comparisonMessageTokens={comparisonMessageTokens}
      />
    </CurrentSalesContent>
  );
};
