import type { MetricCardCode } from '@/constants/dashboard';
import type { MenuMetricCardCodes } from '@/constants/menu';
import type { SalesMetricCardCodes } from '@/constants/sales';

export interface GetAnalysisDetailQuery {
  analysisCardCode: MetricCardCode | SalesMetricCardCodes | MenuMetricCardCodes;
  customPeriod: boolean;
  from?: string;
  to?: string;
}
