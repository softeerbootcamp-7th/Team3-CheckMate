interface SalesByDaySummary {
  topDay: string;
  isSignificant: boolean;
}

interface SalesByDayItem {
  day: string;
  avgNetAmount: number;
  orderCount: number;
}

export interface GetDetailSalesByDayResponseDto extends SalesByDaySummary {
  items: SalesByDayItem[];
}

export interface GetDashboardSalesByDayResponseDto
  extends SalesByDaySummary, SalesByDayItem {}
