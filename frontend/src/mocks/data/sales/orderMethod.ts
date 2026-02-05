import type { SalesSource } from '@/types/sales';

export const ORDER_METHOD_DATA: SalesSource[] = [
  {
    salesSourceType: '카드',
    revenue: 23710000,
    count: 26,
    changeRate: 4.4,
  },
  {
    salesSourceType: '현금',
    revenue: 2231981,
    count: 25,
    changeRate: 6.7,
  },
  {
    salesSourceType: '간편결제',
    revenue: 1744500,
    count: 75,
    changeRate: -5.2,
  },
  {
    salesSourceType: '기타',
    revenue: 998000,
    count: 39,
    changeRate: 8.4,
  },
];
