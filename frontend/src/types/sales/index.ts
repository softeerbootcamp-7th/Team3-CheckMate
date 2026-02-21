export type { SalesSource } from './salesSource';
export type {
  GetRealSalesResponseDto,
  GetOrderCountResponseDto,
  GetAveragePriceResponseDto,
  GetIncomeStructureBySalesTypeResponseDto,
  GetIncomeStructureByOrderChannelResponseDto,
  GetIncomeStructureByPaymentMethodResponseDto,
  GetDetailPeakTimeResponseDto,
  GetDashboardPeakTimeResponseDto,
  GetDetailSalesByDayResponseDto,
  GetDashboardSalesByDayResponseDto,
  GetSalesTrendResponseDto,
  GetTotalSalesResponseDto,
  GetDiscountAndCancellationResponseDto,
} from './dto';
export type { SalesIncomeStructureInsight } from './dashboard-sales-income';
export type { PeakTimeItem, PeakTimeSummary } from './dashboard-sales-pattern';
export type {
  SalesByDaySummary,
  SalesByDayItem,
} from './dashboard-sales-pattern';
export type { SalesTrendItem } from './dashboard-sales-trend';
