import type { MetricCardCode } from '@/constants/dashboard';

export interface PostDashboardSseSubscriptionRequestDto {
  topics: MetricCardCode[];
}
