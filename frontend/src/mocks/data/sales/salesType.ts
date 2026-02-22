import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const SALES_TYPE_DATA: SalesSource<'SALES_TYPE'>[] = [
  {
    salesSourceType: SALES_SOURCE.SALES_TYPE.DINE_IN,
    revenue: 0,
    count: 0,
    changeRate: -4.4,
  },
  {
    salesSourceType: SALES_SOURCE.SALES_TYPE.TAKE_OUT,
    revenue: 0,
    count: 0,
    changeRate: -6.7,
  },
  {
    salesSourceType: SALES_SOURCE.SALES_TYPE.DELIVERY,
    revenue: 0,
    count: 0,
    changeRate: -5.2,
  },
];
