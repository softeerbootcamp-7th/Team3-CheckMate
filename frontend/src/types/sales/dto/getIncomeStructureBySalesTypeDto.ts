import type { SALES_SOURCE } from '@/constants/sales';
import type { ValueOf } from '@/utils/shared';

import type { SalesIncomeStructureInsight } from '../dashboard-sales-income';

interface SalesTypeItem {
  salesType: ValueOf<typeof SALES_SOURCE.SALE_TYPE>;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureBySalesTypeResponseDto {
  insight: SalesIncomeStructureInsight;
  items: SalesTypeItem[];
}
