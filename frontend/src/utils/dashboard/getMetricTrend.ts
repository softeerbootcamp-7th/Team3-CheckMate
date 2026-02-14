import { METRIC_TREND } from '@/constants/dashboard';

interface GetMetricTrendArgs {
  comparisonAmount: number;
  minValue: number;
  maxValue: number;
}

export const getMetricTrend = ({
  comparisonAmount,
  minValue,
  maxValue,
}: GetMetricTrendArgs) => {
  if (comparisonAmount >= maxValue) {
    return METRIC_TREND.UP;
  } else if (comparisonAmount <= minValue) {
    return METRIC_TREND.DOWN;
  } else {
    return METRIC_TREND.SAME;
  }
};
