export interface PeakTimeItem {
  timeSlot2H: number;
  orderCount: number | null;
  netAmount: number | null;
}

type ShiftDirection = 'EARLY' | 'LATE' | 'SAME' | 'UNKNOWN';

export interface PeakTimeSummary {
  todayPeak: number; // 오늘 피크 시간
  comparisonPeak: number; // 비교 시간 피크 시간
  diff: number; // 비교 시간 피크 시간 차이
  shiftDirection: ShiftDirection; // 피크 시간 방향성
  beforeComparisonPeak: boolean; // 비교 시간 피크 시간 이전
}
