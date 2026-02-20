import type {
  SalesIncomeStructureInsight,
  SalesIncomeStructureTopType,
} from '../dashboard-sales-income';

interface OrderMethodItem {
  orderChannel: Extract<
    SalesIncomeStructureTopType,
    'POS' | '키오스크' | '배달앱' | '기타'
  >;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureByOrderMethodResponseDto {
  insight: SalesIncomeStructureInsight;
  items: OrderMethodItem[];
}
