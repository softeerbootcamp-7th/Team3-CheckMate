import type { GetSalesSourceByPayMethodResponseDto } from '@/types/sales';

import { SALES_SOURCE } from '../salesSource';

const PAY_METHOD_KEYS = Object.keys(
  SALES_SOURCE.PAY_METHOD,
) as (keyof typeof SALES_SOURCE.PAY_METHOD)[];

export const PAY_METHOD = {
  EXAMPLE_TOP_TYPE: PAY_METHOD_KEYS[0],
  EXAMPLE_TOP_SHARE: 46,
  EXAMPLE_DELTA_SHARE: 6.7,
  EXAMPLE_PAY_METHOD_DATA: [
    {
      payMethod: PAY_METHOD_KEYS[0],
      salesAmount: 2371000,
      orderCount: 26,
      share: 25,
      deltaShare: 4.4,
    },
    {
      payMethod: PAY_METHOD_KEYS[1],
      salesAmount: 7531000,
      orderCount: 25,
      share: 25,
      deltaShare: 6.7,
    },
    {
      payMethod: PAY_METHOD_KEYS[2],
      salesAmount: 2567000,
      orderCount: 75,
      share: 25,
      deltaShare: -5.2,
    },
    {
      payMethod: PAY_METHOD_KEYS[3],
      salesAmount: 3894000,
      orderCount: 39,
      share: 25,
      deltaShare: 2.4,
    },
  ] as const satisfies GetSalesSourceByPayMethodResponseDto['items'],
  DOUGHNUT_CHART_TITLE: '결제수단별 매출 관련 도넛 차트',
} as const;
