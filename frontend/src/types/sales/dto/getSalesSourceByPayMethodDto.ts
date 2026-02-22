import { SALES_SOURCE } from '@/constants/sales';

import type { SalesSourceInsight } from '../dashboard-sales-source';

interface PayMethodItem {
  payMethod: keyof typeof SALES_SOURCE.PAY_METHOD;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetSalesSourceByPayMethodResponseDto {
  insight?: SalesSourceInsight<
    Extract<keyof typeof SALES_SOURCE, 'PAY_METHOD'>
  >;
  items: PayMethodItem[];
}
