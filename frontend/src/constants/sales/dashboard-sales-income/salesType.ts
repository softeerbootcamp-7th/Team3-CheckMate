import type { GetIncomeStructureBySalesTypeResponseDto } from '@/types/sales';

import { SALES_SOURCE } from '../salesSource';

export const SALES_TYPE = {
  EXAMPLE_TOP_TYPE: '배달' as const,
  EXAMPLE_TOP_SHARE: 43,
  EXAMPLE_DELTA_SHARE: 6.8,
  EXAMPLE_SALES_SOURCE_DATA: [
    {
      salesType: SALES_SOURCE.SALE_TYPE.DINE_IN,
      salesAmount: 2371000,
      orderCount: 26,
      share: 25,
      deltaShare: 4.4,
    },
    {
      salesType: SALES_SOURCE.SALE_TYPE.TAKEOUT,
      salesAmount: 3255000,
      orderCount: 45,
      share: 45,
      deltaShare: -5.2,
    },
    {
      salesType: SALES_SOURCE.SALE_TYPE.DELIVERY,
      salesAmount: 4255000,
      orderCount: 28,
      share: 30,
      deltaShare: 6.8,
    },
  ] as GetIncomeStructureBySalesTypeResponseDto['items'],
  DOUGHNUT_CHART_TITLE: '판매 유형 관련 도넛 차트',
} as const;
