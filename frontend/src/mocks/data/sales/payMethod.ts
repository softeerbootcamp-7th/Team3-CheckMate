import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const PAY_METHOD_DATA: SalesSource[] = [
  {
    salesSource: SALES_SOURCE.PAY_METHOD.CARD,
    salesAmount: 2371000,
    orderCount: 26,
    deltaShare: 4.4,
  },
  {
    salesSource: SALES_SOURCE.PAY_METHOD.CASH,
    salesAmount: 2567000,
    orderCount: 25,
    deltaShare: 6.7,
  },
  {
    salesSource: SALES_SOURCE.PAY_METHOD.EASY_PAY,
    salesAmount: 7531000,
    orderCount: 75,
    deltaShare: -5.2,
  },
  {
    salesSource: SALES_SOURCE.PAY_METHOD.ETC,
    salesAmount: 3894000,
    orderCount: 39,
    deltaShare: 8.4,
  },
];
