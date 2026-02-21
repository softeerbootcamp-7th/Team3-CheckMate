import { useSuspenseQuery } from '@tanstack/react-query';

import {
  SalesTypeContent,
  SalesTypeContentEmptyView,
} from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetSalesSourceBySalesTypeResponseDto } from '@/types/sales';

type DashboardSalesSourceSalesTypeCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.SALES_TYPE
>;

interface DashboardSalesSourceSalesTypeCardProps {
  cardCode: DashboardSalesSourceSalesTypeCardCodes;
}

export const DashboardSalesSourceSalesTypeCard = ({
  cardCode,
}: DashboardSalesSourceSalesTypeCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetSalesSourceBySalesTypeResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  if (data.items.length === 0) {
    return <SalesTypeContentEmptyView />;
  }

  return (
    <SalesTypeContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
