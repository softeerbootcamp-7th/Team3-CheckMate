import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const ORDER_CHANNEL_DATA: SalesSource[] = [
  {
    salesSourceType: SALES_SOURCE.ORDER_CHANNEL.POS,
    revenue: 23710000,
    count: 26,
    changeRate: 4.4,
  },
  {
    salesSourceType: SALES_SOURCE.ORDER_CHANNEL.KIOSK,
    revenue: 1000,
    count: 25,
    changeRate: 6.7,
  },
  {
    salesSourceType: SALES_SOURCE.ORDER_CHANNEL.DELIVERY_APP,
    revenue: 1000,
    count: 75,
    changeRate: -5.2,
  },
];
