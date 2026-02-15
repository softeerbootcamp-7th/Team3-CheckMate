export interface SalesByDaySummary {
  topDay: string;
  isSignificant: boolean;
}

export interface SalesByDayItem {
  day: string;
  avgNetAmount: number;
  orderCount: number;
}
