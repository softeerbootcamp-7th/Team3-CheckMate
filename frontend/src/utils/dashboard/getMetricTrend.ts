import { METRIC_TREND } from '@/constants/dashboard';

export const getMetricTrend = (differentAmount: number) => {
  if (differentAmount > 0) {
    return METRIC_TREND.UP;
  } else if (differentAmount < 0) {
    return METRIC_TREND.DOWN;
  } else {
    return METRIC_TREND.SAME;
  }
};
