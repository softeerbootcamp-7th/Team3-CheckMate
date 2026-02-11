import type { ValueOf } from '@/utils/shared';

export const DAILY_REPORT_STATUS_LABEL = {
  BEST: '최상',
  GOOD: '양호',
  WARNING: '주의',
} as const;

export type DailyReportStatusLabel = ValueOf<typeof DAILY_REPORT_STATUS_LABEL>;
