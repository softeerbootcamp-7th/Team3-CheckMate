import type { GetAnalysisDetailQuery } from '@/types/analysis';

export const salesKeys = {
  all: ['sales'] as const,
  // 매출 현황 섹션의 공통 쿼리 키
  overview: () => [...salesKeys.all, 'overview'] as const,
  realSales: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.overview(), 'realSales', query] as const,
  orderCount: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.overview(), 'orderCount', query] as const,
  averagePrice: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.overview(), 'averagePrice', query] as const,
  totalSales: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.overview(), 'totalSales', query] as const,
  discountAndCancellation: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.overview(), 'discountAndCancellation', query] as const,
  // 매출 패턴 섹션의 공통 쿼리 키
  patterns: () => [...salesKeys.all, 'patterns'] as const,
  peakTimeByHour: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.patterns(), 'peakTimeByHour', query] as const,
  // 매출 유입 구조 섹션의 공통 쿼리 키
  source: () => [...salesKeys.all, 'source'] as const,
  // 매출 추이 섹션의 공통 쿼리 키
  trends: () => [...salesKeys.all, 'trends'] as const,
  dailyRevenueTrend: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.trends(), 'dailyRevenueTrend', query] as const,
  weeklyRevenueTrend: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.trends(), 'weeklyRevenueTrend', query] as const,
  monthlyRevenueTrend: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.trends(), 'monthlyRevenueTrend', query] as const,
  yearlyRevenueTrend: (query: GetAnalysisDetailQuery) =>
    [...salesKeys.trends(), 'yearlyRevenueTrend', query] as const,
};
