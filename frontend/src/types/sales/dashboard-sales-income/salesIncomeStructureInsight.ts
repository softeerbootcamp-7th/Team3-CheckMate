import type { SalesSourceType } from '@/constants/sales';

export type SalesIncomeStructureTopType = SalesSourceType;

export interface SalesIncomeStructureInsight {
  topType: SalesIncomeStructureTopType;
  topShare: number;
  deltaShare: number;
  showDeltaText?: boolean;
  showFocusText?: boolean;
}
