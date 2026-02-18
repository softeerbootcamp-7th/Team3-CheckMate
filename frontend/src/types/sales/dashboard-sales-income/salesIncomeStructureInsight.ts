import type { SALES_SOURCE } from '@/constants/sales';

export type SalesIncomeStructureTopType<T extends keyof typeof SALES_SOURCE> =
  keyof (typeof SALES_SOURCE)[T];

export interface SalesIncomeStructureInsight<
  T extends keyof typeof SALES_SOURCE,
> {
  topType: SalesIncomeStructureTopType<T>;
  topShare: number;
  deltaShare: number;
  showDeltaText?: boolean;
  showFocusText?: boolean;
}
