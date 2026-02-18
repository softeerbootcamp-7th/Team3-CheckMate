import type {
  SalesIncomeStructureInsight,
  SalesIncomeStructureTopType,
} from '../dashboard-sales-income';

interface PaymentMethodItem {
  payMethod: Extract<
    SalesIncomeStructureTopType,
    '카드' | '현금' | '간편결제' | '기타'
  >;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureByPaymentMethodResponseDto {
  insight: SalesIncomeStructureInsight;
  items: PaymentMethodItem[];
}
