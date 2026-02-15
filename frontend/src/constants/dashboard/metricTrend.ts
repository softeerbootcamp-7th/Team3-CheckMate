import type { ValueOf } from '@/utils/shared';

export const METRIC_TREND = {
  UP: 'up',
  DOWN: 'down',
  SAME: 'same',
} as const;

export type MetricTrend = ValueOf<typeof METRIC_TREND>;
