import type { SALES_SOURCE } from '@/constants/sales';

import type { SalesSourceInsight } from '../dashboard-sales-source';

interface SalesTypeItem {
  salesType: keyof typeof SALES_SOURCE.SALES_TYPE;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetSalesSourceBySalesTypeResponseDto {
  insight?: SalesSourceInsight<
    Extract<keyof typeof SALES_SOURCE, 'SALES_TYPE'>
  >;
  items: SalesTypeItem[];
}
