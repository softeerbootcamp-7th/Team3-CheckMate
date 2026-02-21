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
      | 'yearlyRevenueTrend'
      | 'peakTimeByHour'
    >,
  ) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys[key](query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const salesOptions = {
  realSales: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.realSales(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  orderCount: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.orderCount(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  averagePrice: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.averagePrice(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  totalSales: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.totalSales(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  discountAndCancellation: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.discountAndCancellation(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  dailyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('dailyRevenueTrend')(query),
  weeklyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('weeklyRevenueTrend')(query),
  monthlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('monthlyRevenueTrend')(query),
  yearlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('yearlyRevenueTrend')(query),
  peakTimeByHour: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('peakTimeByHour')(query),
};
