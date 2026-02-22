import type { SALES_SOURCE } from '@/constants/sales';

export type SalesSourceTopType<T extends keyof typeof SALES_SOURCE> =
  keyof (typeof SALES_SOURCE)[T];

export interface SalesSourceInsight<T extends keyof typeof SALES_SOURCE> {
  topType: SalesSourceTopType<T>;
  topShare: number;
  deltaShare: number;
  showDeltaText?: boolean;
  showFocusText?: boolean;
}
