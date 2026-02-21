import { type QueryKey, queryOptions } from '@tanstack/react-query';

import { getAnalysisDetail } from '@/services/analysis';
import { salesKeys } from '@/services/sales/keys';
import type { GetAnalysisDetailQuery } from '@/types/analysis';

const createSalesDetailQueryOption =
  <T>(key: (q: GetAnalysisDetailQuery) => QueryKey) =>
  (query: GetAnalysisDetailQuery) =>
    queryOptions({
      queryKey: key(query),
      queryFn: () => getAnalysisDetail<T>(query),
    });

export const salesOptions = {
  realSales: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.realSales)(query),
  orderCount: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.orderCount)(query),
  averagePrice: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.averagePrice)(query),
  totalSales: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.totalSales)(query),
  discountAndCancellation: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.discountAndCancellation)(query),
  salesType: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.salesType)(query),
  orderChannel: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.orderChannel)(query),
  payMethod: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.payMethod)(query),
  dailyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.dailyRevenueTrend)(query),
  weeklyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.weeklyRevenueTrend)(query),
  monthlyRevenueTrend: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.monthlyRevenueTrend)(query),
  peakTimeByHour: <T>(query: GetAnalysisDetailQuery) =>
    createSalesDetailQueryOption<T>(salesKeys.peakTimeByHour)(query),
};
