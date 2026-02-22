import type { GetSalesSourceBySalesTypeResponseDto } from '@/types/sales';

import { SALES_SOURCE } from '../salesSource';

const SALES_TYPE_KEYS = Object.keys(
  SALES_SOURCE.SALES_TYPE,
) as (keyof typeof SALES_SOURCE.SALES_TYPE)[];

export const SALES_TYPE = {
  EXAMPLE_TOP_TYPE: 'DELIVERY' as const,
  EXAMPLE_TOP_SHARE: 43,
  EXAMPLE_DELTA_SHARE: 6.8,
  EXAMPLE_SALES_SOURCE_DATA: [
    {
      salesType: SALES_TYPE_KEYS[0],
      salesAmount: 2371000,
      orderCount: 26,
      share: 25,
      deltaShare: 4.4,
    },
    {
      salesType: SALES_TYPE_KEYS[2],
      salesAmount: 3255000,
      orderCount: 45,
      share: 45,
      deltaShare: -5.2,
    },
    {
      salesType: SALES_TYPE_KEYS[1],
      salesAmount: 4255000,
      orderCount: 28,
      share: 30,
      deltaShare: 6.8,
    },
  ] as const satisfies GetSalesSourceBySalesTypeResponseDto['items'],
  DOUGHNUT_CHART_TITLE: '판매 유형 관련 도넛 차트',
} as const;
