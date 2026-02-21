import { queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import { salesKeys } from '@/services/sales/keys';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

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
    queryOptions({
      queryKey: salesKeys.dailyRevenueTrend(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  weeklyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.weeklyRevenueTrend(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  monthlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.monthlyRevenueTrend(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
  yearlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: salesKeys.yearlyRevenueTrend(query),
      queryFn: () => getAnalysisDetail<T>(query),
    }),
};
