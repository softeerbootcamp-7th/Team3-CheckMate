import { SALES_SOURCE } from '@/constants/sales';
import type { SalesSource } from '@/types/sales';

export const ORDER_CHANNEL_DATA: SalesSource[] = [
  {
    salesSource: SALES_SOURCE.ORDER_CHANNEL.POS,
    salesAmount: 23710000,
    orderCount: 26,
    deltaShare: 4.4,
  },
  {
    salesSource: SALES_SOURCE.ORDER_CHANNEL.KIOSK,
    salesAmount: 1000,
    orderCount: 25,
    deltaShare: 6.7,
  },
  {
    salesSource: SALES_SOURCE.ORDER_CHANNEL.DELIVERY_APP,
    salesAmount: 1000,
    orderCount: 75,
    deltaShare: -5.2,
  },
];
