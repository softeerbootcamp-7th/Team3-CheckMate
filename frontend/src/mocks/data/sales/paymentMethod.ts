import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const PAYMENT_METHOD_DATA: SalesSource[] = [
  {
    salesSourceType: SALES_SOURCE.PAYMENT_METHOD.CARD,
    revenue: 2371000,
    count: 26,
    changeRate: 4.4,
  },
  {
    salesSourceType: SALES_SOURCE.PAYMENT_METHOD.CASH,
    revenue: 2567000,
    count: 25,
    changeRate: 6.7,
  },
  {
    salesSourceType: SALES_SOURCE.PAYMENT_METHOD.EASY_PAY,
    revenue: 7531000,
    count: 75,
    changeRate: -5.2,
  },
  {
    salesSourceType: SALES_SOURCE.PAYMENT_METHOD.ETC,
    revenue: 3894000,
    count: 39,
    changeRate: 8.4,
  },
];
