import type { SalesSourceType } from '@/constants/sales';

export interface SalesSource {
  salesSourceType: SalesSourceType;
  revenue: number;
  count: number;
  changeRate?: number;
}
