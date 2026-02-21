import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import { salesKeys } from '@/services/sales/keys';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

const createSalesDetailQueryOption =
  <T>(
    key: Extract<
      keyof typeof salesKeys,
      | 'realSales'
      | 'orderCount'
      | 'averagePrice'
      | 'totalSales'
      | 'discountAndCancellation'
      | 'dailyRevenueTrend'
      | 'weeklyRevenueTrend'
      | 'monthlyRevenueTrend'
      | 'peakTimeByHour'
      | 'weekdaySalesPattern'
    >,
  ) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys[key](query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const salesOptions = {
  realSales: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('realSales')(query),
  orderCount: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('orderCount')(query),
  averagePrice: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('averagePrice')(query),
  totalSales: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('totalSales')(query),
  discountAndCancellation: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('discountAndCancellation')(query),
  dailyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('dailyRevenueTrend')(query),
  weeklyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('weeklyRevenueTrend')(query),
  monthlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('monthlyRevenueTrend')(query),
  peakTimeByHour: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('peakTimeByHour')(query),
  weekdaySalesPattern: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>('weekdaySalesPattern')(query),
};
