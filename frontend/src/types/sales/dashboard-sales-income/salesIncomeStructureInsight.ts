export type SalesIncomeStructureTopType =
  | '홀'
  | '포장'
  | '배달'
  | 'POS'
  | '키오스크'
  | '배달앱'
  | '카드'
  | '현금'
  | '간편결제'
  | '기타';

export interface SalesIncomeStructureInsight {
  topType: SalesIncomeStructureTopType;
  topShare: number;
  deltaShare: number;
  showDeltaText?: boolean;
  showFocusText?: boolean;
}
