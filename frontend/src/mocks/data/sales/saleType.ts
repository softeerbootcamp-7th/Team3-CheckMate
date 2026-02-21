import { SALES_SOURCE } from '@/constants/sales/salesSource';
import type { SalesSource } from '@/types/sales';

export const SALE_TYPE_DATA: SalesSource[] = [
  {
    salesSourceType: SALES_SOURCE.SALE_TYPE.DINE_IN,
    revenue: 0,
    count: 0,
    changeRate: -4.4,
  },
  {
    salesSourceType: SALES_SOURCE.SALE_TYPE.TAKE_OUT,
    revenue: 0,
    count: 0,
    changeRate: -6.7,
  },
  {
    salesSourceType: SALES_SOURCE.SALE_TYPE.DELIVERY,
    revenue: 0,
    count: 0,
    changeRate: -5.2,
  },
];
