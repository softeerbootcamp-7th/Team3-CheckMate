import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import { salesKeys } from '@/services/sales/keys';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

const createSalesDetailQueryOption =
  <T>(
    key: Extract<
      keyof typeof salesKeys,
      | 'dailyRevenueTrend'
      | 'weeklyRevenueTrend'
      | 'monthlyRevenueTrend'
      | 'peakTimeByHour'
    >,
  ) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys[key](query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const salesOptions = {
  dailyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('dailyRevenueTrend')(query),
  weeklyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('weeklyRevenueTrend')(query),
  monthlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('monthlyRevenueTrend')(query),
  peakTimeByHour: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('peakTimeByHour')(query),
};
