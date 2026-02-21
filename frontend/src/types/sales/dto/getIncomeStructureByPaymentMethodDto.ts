import { SALES_SOURCE } from '@/constants/sales';

import type { SalesIncomeStructureInsight } from '../dashboard-sales-income';

interface PaymentMethodItem {
  payMethod: keyof typeof SALES_SOURCE.PAYMENT_METHOD;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureByPaymentMethodResponseDto {
  insight: SalesIncomeStructureInsight<
    Extract<keyof typeof SALES_SOURCE, 'PAYMENT_METHOD'>
  >;
  items: PaymentMethodItem[];
}
