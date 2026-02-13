import type { MetricCardCode } from '@/constants/dashboard';

export interface DashboardCard {
  cardCode: MetricCardCode;
  rowNo: number;
  colNo: number;
}
