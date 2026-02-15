import type {
  SalesByDayItem,
  SalesByDaySummary,
} from '../dashboard-sales-pattern';

export interface GetDetailSalesByDayResponseDto extends SalesByDaySummary {
  items: SalesByDayItem[];
}

export interface GetDashboardSalesByDayResponseDto
  extends SalesByDaySummary, SalesByDayItem {}
