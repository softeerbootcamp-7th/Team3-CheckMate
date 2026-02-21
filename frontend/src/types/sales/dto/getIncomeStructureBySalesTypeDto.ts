import type { SALES_SOURCE } from '@/constants/sales';

import type { SalesIncomeStructureInsight } from '../dashboard-sales-income';

interface SalesTypeItem {
  salesType: keyof typeof SALES_SOURCE.SALE_TYPE;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureBySalesTypeResponseDto {
  insight?: SalesIncomeStructureInsight<
    Extract<keyof typeof SALES_SOURCE, 'SALE_TYPE'>
  >;
  items: SalesTypeItem[];
}
