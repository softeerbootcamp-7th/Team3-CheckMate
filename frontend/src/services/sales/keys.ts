import type { SalesMetricCardCodes } from '@/constants/sales';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

export const salesKeys = {
  all: ['sales'] as const,
  // 매출 현황 섹션의 공통 쿼리 키
  overview: () => [...salesKeys.all, 'overview'] as const,
  // 매출 패턴 섹션의 공통 쿼리 키
  patterns: () => [...salesKeys.all, 'patterns'] as const,
  // 매출 유입 구조 섹션의 공통 쿼리 키
  source: () => [...salesKeys.all, 'source'] as const,
  // 매출 추이 섹션의 공통 쿼리 키
  trends: () => [...salesKeys.all, 'trends'] as const,
  dailyRevenueTrend: (
    salesMetricCardCode: SalesMetricCardCodes,
    query: GetAnalysisDetailQuery,
  ) =>
    [
      ...salesKeys.all,
      'dailyRevenueTrend',
      salesMetricCardCode,
      query,
    ] as const,
  weeklyRevenueTrend: (
    salesMetricCardCode: SalesMetricCardCodes,
    query: GetAnalysisDetailQuery,
  ) =>
    [
      ...salesKeys.all,
      'weeklyRevenueTrend',
      salesMetricCardCode,
      query,
    ] as const,
  monthlyRevenueTrend: (
    salesMetricCardCode: SalesMetricCardCodes,
    query: GetAnalysisDetailQuery,
  ) =>
    [
      ...salesKeys.all,
      'monthlyRevenueTrend',
      salesMetricCardCode,
      query,
    ] as const,
  yearlyRevenueTrend: (
    salesMetricCardCode: SalesMetricCardCodes,
    query: GetAnalysisDetailQuery,
  ) =>
    [
      ...salesKeys.all,
      'yearlyRevenueTrend',
      salesMetricCardCode,
      query,
    ] as const,
};
