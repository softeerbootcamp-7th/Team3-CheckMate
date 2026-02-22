import type { SalesSourceValueType } from '@/constants/sales';

export interface SalesSource {
  salesSource: SalesSourceValueType;
  salesAmount: number;
  orderCount: number;
  share?: number;
  deltaShare: number;
}
