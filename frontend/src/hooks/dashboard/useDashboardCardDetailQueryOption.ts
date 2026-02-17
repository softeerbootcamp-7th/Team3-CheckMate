import { type MetricCardCode } from '@/constants/dashboard/dashboardMetricCards';
import { useDashboardTabsContext } from '@/hooks/dashboard';
import { dashboardOptions } from '@/services/dashboard';

export const useDashboardCardDetailQueryOption = () => {
  const { currentDashboardId } = useDashboardTabsContext();

  const createCardDetailQuery = <T>(cardCode: MetricCardCode) =>
    dashboardOptions.cardDetail<T>(currentDashboardId, {
      analysisCardCode: cardCode,
      customPeriod: false,
    });

  return { createCardDetailQuery };
};
