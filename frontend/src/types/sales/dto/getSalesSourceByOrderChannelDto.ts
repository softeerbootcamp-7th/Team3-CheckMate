import type { SALES_SOURCE } from '@/constants/sales';

import type { SalesSourceInsight } from '../dashboard-sales-source';

interface OrderChannelItem {
  orderChannel: keyof typeof SALES_SOURCE.ORDER_CHANNEL;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetSalesSourceByOrderChannelResponseDto {
  insight?: SalesSourceInsight<
    Extract<keyof typeof SALES_SOURCE, 'ORDER_CHANNEL'>
  >;
  items: OrderChannelItem[];
}
