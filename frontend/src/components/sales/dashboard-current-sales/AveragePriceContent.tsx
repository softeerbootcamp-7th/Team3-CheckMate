import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { AVERAGE_PRICE, SALES_UNIT } from '@/constants/sales';
import type { GetAveragePriceResponseDto } from '@/types/sales';
import { getMetricTrend } from '@/utils/dashboard';
import { getSalesCurrentComparisonMessage } from '@/utils/sales';

import { CurrentSalesContent } from './CurrentSalesContent';

const {
  EXAMPLE_AMOUNT,
  EXAMPLE_COMPARISON_AMOUNT,
  EXAMPLE_HAS_PREVIOUS_DATA,
  MIN_CHANGE_RATE,
  MAX_CHANGE_RATE,
  METRIC_LABEL,
} = AVERAGE_PRICE;

type AveragePriceCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.AVERAGE_PRICE
>;

interface AveragePriceContentProps extends GetAveragePriceResponseDto {
  cardCode: AveragePriceCardCodes;
  className?: string;
}

export const AveragePriceContent = ({
  cardCode,
  averageOrderAmount = EXAMPLE_AMOUNT,
  differenceAmount = EXAMPLE_COMPARISON_AMOUNT,
  hasPreviousData = EXAMPLE_HAS_PREVIOUS_DATA,
  className,
}: AveragePriceContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;
  const metricTrend = getMetricTrend({
    comparisonAmount: differenceAmount,
    minValue: MIN_CHANGE_RATE,
    maxValue: MAX_CHANGE_RATE,
  });
  const comparisonMessageTokens = getSalesCurrentComparisonMessage({
    periodType,
    hasPreviousData,
    metricTrend,
    metricLabel: METRIC_LABEL,
    comparisonAmount: differenceAmount,
    unit: SALES_UNIT.WON,
  });
  return (
    <CurrentSalesContent className={className}>
      <CurrentSalesContent.TrendBadge trend={metricTrend} />
      <CurrentSalesContent.Amount
        amount={averageOrderAmount}
        unit={SALES_UNIT.WON}
      />
      <CurrentSalesContent.ComparisonMessage
        comparisonMessageTokens={comparisonMessageTokens}
      />
    </CurrentSalesContent>
  );
};
