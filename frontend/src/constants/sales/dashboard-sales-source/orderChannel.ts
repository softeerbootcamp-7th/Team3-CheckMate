import type { GetSalesSourceByOrderChannelResponseDto } from '@/types/sales';

import { SALES_SOURCE } from '../salesSource';

const ORDER_CHANNEL_KEYS = Object.keys(
  SALES_SOURCE.ORDER_CHANNEL,
) as (keyof typeof SALES_SOURCE.ORDER_CHANNEL)[];

export const ORDER_CHANNEL = {
  EXAMPLE_TOP_TYPE: 'KIOSK',
  EXAMPLE_TOP_SHARE: 50,
  EXAMPLE_DELTA_SHARE: 4,
  EXAMPLE_ORDER_CHANNEL_DATA: [
    {
      orderChannel: ORDER_CHANNEL_KEYS[0],
      salesAmount: 2371000,
      orderCount: 26,
      share: 25,
      deltaShare: 2.4,
    },
    {
      orderChannel: ORDER_CHANNEL_KEYS[1],
      salesAmount: 5329000,
      orderCount: 53,
      share: 25,
      deltaShare: 4,
    },
    {
      orderChannel: ORDER_CHANNEL_KEYS[2],
      salesAmount: 1986000,
      orderCount: 19,
      share: 25,
      deltaShare: -5.2,
    },
  ] as const satisfies GetSalesSourceByOrderChannelResponseDto['items'],
  DOUGHNUT_CHART_TITLE: '주문수단별 매출 관련 도넛 차트',
} as const;
