import type {
  SalesIncomeStructureInsight,
  SalesIncomeStructureTopType,
} from '../dashboard-sales-income';

interface SalesTypeItem {
  salesType: Extract<SalesIncomeStructureTopType, '홀' | '포장' | '배달'>;
  salesAmount: number;
  orderCount: number;
  share: number;
  deltaShare: number;
}

export interface GetIncomeStructureBySalesTypeResponseDto {
  insight: SalesIncomeStructureInsight;
  items: SalesTypeItem[];
}
