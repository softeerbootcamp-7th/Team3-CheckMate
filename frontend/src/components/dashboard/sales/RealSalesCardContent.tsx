import {
  DASHBOARD_METRIC_CARDS,
  type DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { REAL_SALES, SALES_UNIT } from '@/constants/sales';
import type { GetRealTimeSalesResponseDto } from '@/types/sales';
import { getComparisonMessage, getMetricTrend } from '@/utils/dashboard';
import type { Nullable } from '@/utils/shared';

import { CurrentSalesContent } from './CurrentSalesContent';

type RealSalesCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.REAL_SALES
>;

interface RealSalesCardContentProps extends Nullable<GetRealTimeSalesResponseDto> {
  cardCode: RealSalesCardCodes;
  className?: string;
}

const {
  METRIC_LABEL,
  MIN_CHANGE_RATE,
  MAX_CHANGE_RATE,
  EXAMPLE_AMOUNT,
  EXAMPLE_CHANGE_RATE,
  EXAMPLE_HAS_PREVIOUS_DATA,
} = REAL_SALES;

export const RealSalesCardContent = ({
  cardCode,
  netAmount = EXAMPLE_AMOUNT,
  changeRate = EXAMPLE_CHANGE_RATE,
  hasPreviousData = EXAMPLE_HAS_PREVIOUS_DATA,
  className,
}: RealSalesCardContentProps) => {
  const periodType = DASHBOARD_METRIC_CARDS[cardCode].period;

  const metricTrend = getMetricTrend({
    comparisonAmount: changeRate,
    minValue: MIN_CHANGE_RATE,
    maxValue: MAX_CHANGE_RATE,
  });

  const { commonText, highlightText } = getComparisonMessage({
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
        comparisonMessage={commonText}
        changeRateMessage={highlightText}
        metricTrend={metricTrend}
      />
    </CurrentSalesContent>
  );
};
