import type { MetricCardCode } from '@/constants/dashboard';

export interface GetAnalysisDetailQuery {
  analysisCardCode: MetricCardCode;
  customPeriod: boolean;
  from?: string;
  to?: string;
}
