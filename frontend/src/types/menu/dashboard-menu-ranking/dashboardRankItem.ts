import type { IngredientUnit } from '@/constants/ingredient';

// 대시보드 메뉴 파트에서 메뉴/식자재 랭킹에서 사용되는 데이터 형태
export interface DashboardRankItem {
  rank: number;
  itemName: string;
  totalAmount: number;
  unit: '원' | IngredientUnit;
}
