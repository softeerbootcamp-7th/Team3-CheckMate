import type { MetricCardCode } from '@/constants/dashboard';
import type { SalesMetricCardCodes } from '@/constants/sales';

export interface GetAnalysisDetailQuery {
  analysisCardCode: MetricCardCode | SalesMetricCardCodes;
  customPeriod: boolean;
  from?: string;
  to?: string;
}
