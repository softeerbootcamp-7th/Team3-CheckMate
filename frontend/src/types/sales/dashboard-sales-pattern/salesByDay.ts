type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface SalesByDaySummary {
  topDay: Day;
  isSignificant: boolean;
}

export interface SalesByDayItem {
  day: Day;
  avgNetAmount: number;
  orderCount: number;
}
