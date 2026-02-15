import type { PeakTimeItem, PeakTimeSummary } from '../dashboard-sales-pattern';

export interface GetDetailPeakTimeResponseDto extends PeakTimeSummary {
  todayItems: PeakTimeItem[];
  week4Items: PeakTimeItem[];
}

/**
 * 대시보드 피크 시간 DTO (SSE)
 */
export interface GetDashboardPeakTimeResponseDto extends PeakTimeSummary {
  timeSlot2H: number; // 현재 시간
  orderCount: number; // 현재 시간 주문건수
  netAmount: number; // 현재 시간 실매출액
}
