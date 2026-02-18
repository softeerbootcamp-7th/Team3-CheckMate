import type { GetIncomeStructureByOrderChannelResponseDto } from '@/types/sales';

export const ORDER_METHOD = {
  EXAMPLE_TOP_TYPE: '키오스크',
  EXAMPLE_TOP_SHARE: 50,
  EXAMPLE_DELTA_SHARE: 4,
  EXAMPLE_ORDER_METHOD_DATA: [
    {
      orderChannel: 'POS',
      salesAmount: 2371000,
      orderCount: 26,
      share: 25,
      deltaShare: 2.4,
    },
    {
      orderChannel: '키오스크',
      salesAmount: 5329000,
      orderCount: 53,
      share: 25,
      deltaShare: 4,
    },
    {
      orderChannel: '배달앱',
      salesAmount: 1986000,
      orderCount: 19,
      share: 25,
      deltaShare: -5.2,
    },
    {
      orderChannel: '기타',
      salesAmount: 954000,
      orderCount: 24,
      share: 25,
      deltaShare: -1.8,
    },
  ] as const satisfies GetIncomeStructureByOrderChannelResponseDto['items'],
  DOUGHNUT_CHART_TITLE: '주문수단별 매출 관련 도넛 차트',
} as const;
