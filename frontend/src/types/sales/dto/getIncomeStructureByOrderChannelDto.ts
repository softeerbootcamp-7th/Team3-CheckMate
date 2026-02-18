import type { SALES_SOURCE } from '@/constants/sales';
import type { ValueOf } from '@/utils/shared';

import type { SalesIncomeStructureInsight } from '../dashboard-sales-income';

interface OrderChannelItem {
  orderChannel: ValueOf<typeof SALES_SOURCE.ORDER_METHOD> | '기타';
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureByOrderChannelResponseDto {
  insight: SalesIncomeStructureInsight;
  items: OrderChannelItem[];
}
