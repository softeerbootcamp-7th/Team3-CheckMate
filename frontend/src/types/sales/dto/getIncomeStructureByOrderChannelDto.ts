import type { SALES_SOURCE } from '@/constants/sales';

import type { SalesIncomeStructureInsight } from '../dashboard-sales-income';

interface OrderChannelItem {
  orderChannel: keyof typeof SALES_SOURCE.ORDER_METHOD;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureByOrderChannelResponseDto {
  insight?: SalesIncomeStructureInsight<
    Extract<keyof typeof SALES_SOURCE, 'ORDER_METHOD'>
  >;
  items: OrderChannelItem[];
}
