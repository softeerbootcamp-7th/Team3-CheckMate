import type { MetricCardCode } from '@/constants/dashboard';

export interface DeleteDashboardSseSubscriptionRequestDto {
  topics: MetricCardCode[];
}
