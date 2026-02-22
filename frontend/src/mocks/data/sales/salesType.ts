import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const SALES_TYPE_DATA: SalesSource[] = [
  {
    salesSource: SALES_SOURCE.SALES_TYPE.DINE_IN,
    salesAmount: 0,
    orderCount: 0,
    deltaShare: -4.4,
  },
  {
    salesSource: SALES_SOURCE.SALES_TYPE.TAKE_OUT,
    salesAmount: 0,
    orderCount: 0,
    deltaShare: -6.7,
  },
  {
    salesSource: SALES_SOURCE.SALES_TYPE.DELIVERY,
    salesAmount: 0,
    orderCount: 0,
    deltaShare: -5.2,
  },
];
